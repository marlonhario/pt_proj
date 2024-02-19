import React from "react"

interface ChildrenProps {
  children: React.ReactNode
}

export const TableTitle: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="card__title">{children}</div>
}

export const TableTitleText: React.FC<ChildrenProps> = ({ children }) => {
  return <h5 className="bold-text">{children}</h5>
}

export const TableTitleSubText: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <h5 className="subhead">
      {children}
    </h5>
  )
}
