import React from 'react'
// import myButton from '../button/button';
import { 
    Card,
    Table,
    Input,
    Select,
    Button,
    Form
} from 'antd';

const { Option } = Select;

export default function ProductHome(props) {
    let {
        total,
        extra,
        columns,
        data,
        getProductInfo,
        loading,
        handleKeyWordsInput,
        searchName,
        searchType,
        handleSelect,
        pageNum
    }=props
    const title = (
        <Form layout="inline">
        <Form.Item>
            <Select
                value={searchType}
                style={{ width: '35%', marginRight: '3%' }}
                onChange={value =>{handleSelect(value)}}
            >
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input
                type="text"
                placeholder="关键字"
                value={searchName}
                style={{ width: '60%', marginRight: '3%' }}
                onChange={handleKeyWordsInput}
            />
            <Button 
            type="primary" 
            htmlType="submit"
            onClick={()=>{getProductInfo(1)}}
            >搜索</Button>
        </Form.Item>
      </Form>
    )
    return (
        <Card title={title} extra={extra}>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                bordered
                pagination={{
                    current:pageNum,
                    defaultPageSize:3,
                    total:total,
                    showQuickJumper:true,
                    onChange:getProductInfo
                }}
                loading={loading}
            />
        </Card>
    )
}
