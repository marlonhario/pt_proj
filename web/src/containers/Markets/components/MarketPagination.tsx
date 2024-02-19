import React from 'react';
import { Col, Button, CustomInput, Input, Row } from 'reactstrap';

interface Props {
    onChangeInSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeInInput:  (event: React.ChangeEvent<HTMLInputElement>) => void;
    canPreviousPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
    previousPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
    pageIndex: number;
    pageOptions: String[];
    pageSize: number;
    nextPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
    canNextPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
    pageCount: number;
    gotoPage: any;
}

export const MarketPagination: React.FC<Props> = ({
    onChangeInSelect,
    onChangeInInput,
    canPreviousPage,
    previousPage,
    pageIndex,
    pageOptions,
    pageSize,
    nextPage,
    canNextPage,
    pageCount,
    gotoPage }) => {
        
    return (
        <Col>
            <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
                <Col md={3}>
                    <Button
                        color='primary'
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {'<<'}
                    </Button>
                    <Button
                        color='primary'
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                    >
                        {'<'}
                    </Button>
                </Col>
                <Col md={2} style={{ marginTop: 7 }}>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </Col>
                <Col md={2}>
                    <Input
                        type='number'
                        min={1}
                        style={{ width: 70 }}
                        max={pageOptions.length}
                        defaultValue={pageIndex + 1}
                        onChange={onChangeInInput}
                    />
                </Col>
                <Col md={2}>
                    <CustomInput
                        id="show_page"
                        type='select'
                        value={pageSize}
                        onChange={onChangeInSelect}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </CustomInput>
                </Col>
                <Col md={3}>
                    <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
                        {'>'}
                    </Button>
                    <Button
                        color='primary'
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {'>>'}
                    </Button>
                </Col>
            </Row>
        </Col>
    )
}
