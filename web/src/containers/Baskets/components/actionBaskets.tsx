import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2'
import { toastify } from "../../../components/Toastify"

import {
  useDeleteStrategiesMutation,
  useRetrieveStrategiesMutation,
  useTransferStrategiesMutation
} from "../../../generated/graphql"
import { ContextBasket, ContextFilterBasket } from "../../../hooks/context/Context"
import useBaskets from "../../../services/graphQL/Baskets/useBaskets"
import { BasketFilter, BasketRecord, BasketSort } from "../../../types/Baskets"
import { staticData } from "../components/data"

const ActionBaskets = () => {
  const history = useHistory()
  const { data_list } = staticData()
  const { refetchStrategies, refetchTrash } = useBaskets()

  /* Apollo */
  const [deleteStrategies] = useDeleteStrategiesMutation()
  const [retrieveStrategies] = useRetrieveStrategiesMutation()
  const [transferStrategies] = useTransferStrategiesMutation()

  /* Context */
  const { basketState, basketDispatch } = useContext(ContextBasket)
  const { filterBasketDispatch } = useContext(ContextFilterBasket)

  /* State */
  const [dropDown, setDropDown] = useState<BasketFilter[]>(data_list)
  const [inputRecord, setInputRecord] = useState<BasketRecord[]>(
    [{ defaultValue: 0, defaultId: "minimum_net_profit", label: "Minimum net profit", hidden: true }]
  )

  const handleSorting = (event: BasketSort) => {
    const sort: string = event.value === 'max_stagnation_number' ? 'ASC' : 'DESC'

    if (event.value !== basketState.sort_collection) {
      basketDispatch({
        type: 'baskets/SORT_COLLECTION',
        sort_collection: event.value,
        sort_order: sort
      })

      refetchStrategies()
    }
  }

  const handleDropDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { value, name, innerHTML } = event.currentTarget as HTMLInputElement
    const val: number = parseInt(value)

    filterBasketDispatch({
      type: name,
      id: name,
      value: val,
    })

    const record = inputRecord.some(record => record.defaultId.indexOf(name) >= 0)
    if (!record) {
      setInputRecord([...inputRecord, { defaultValue: val, defaultId: name, label: innerHTML }])

      const newState = dropDown.map(val => val.text === name ? { ...val, ['hidden']: true } : val);

      setDropDown(newState)
    }

    refetchStrategies()
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget

    filterBasketDispatch({
      type: name,
      id: name,
      value: parseInt(value)
    })
    refetchStrategies()
  }

  const handleRemove = (row: number, name: string) => {
    const list = [...inputRecord]
    list.splice(row, 1)

    setInputRecord(list)

    filterBasketDispatch({
      type: name,
      id: '',
      value: 0,
    })

    const newState = dropDown.map(val => val.text === name ? { ...val, ['hidden']: false } : val);
    setDropDown(newState)

    refetchStrategies()
  }

  const handleMove = (id: string) => {
    Swal.fire({
      title: 'Information',
      text: "Are you sure you want to move?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await transferStrategies({
            variables: {
              id: id
            }
          })

          if (response && response.data.transferStrategies) {
            Swal.fire({
              title: 'Successful!',
              text: 'Your strategies is successfully transfer.',
              icon: 'success',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                refetchStrategies()
                history.push("/paper-trading")
              }
            })
          }
        } catch (e) {
          toastify(400, `Error upon transfer, ${e}`)
        }
      }
    })
  }

  const handleTrash = (id: string) => {
    Swal.fire({
      title: 'Warning',
      text: "Are you sure you want to delete?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteStrategies({
            variables: {
              id: id
            }
          })

          if (response && response.data.deleteStrategies) {
            Swal.fire({
              title: 'Successful!',
              text: 'Your strategies is successfully deleted.',
              icon: 'success',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                refetchStrategies()
                refetchTrash()
              }
            })
          }
        } catch (e) {
          toastify(400, `Error upon delete, ${e}`)
        }
      }
    })
  }

  const handleRetrieve = (id: string) => {
    Swal.fire({
      title: 'Warning',
      text: "Are you sure you want to retrieve?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await retrieveStrategies({
            variables: {
              id: id
            }
          })

          if (response && response.data.retrieveStrategies.strategies.id) {
            Swal.fire({
              title: 'Successful!',
              text: 'Your strategies is successfully deleted.',
              icon: 'success',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                refetchStrategies()
                refetchTrash()
              }
            })
          }
        } catch (e) {
          toastify(400, `Error upon retrieving, ${e}`)
        }
      }
    })
  }

  return {
    handleSorting,
    handleDropDown,
    dropDown,
    inputRecord,
    handleInput,
    handleRemove,
    handleMove,
    handleTrash,
    handleRetrieve
  }
}

export default ActionBaskets