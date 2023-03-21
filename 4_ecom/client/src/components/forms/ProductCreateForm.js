import React from 'react'
import { Select } from 'antd';
const { Option } = Select;

const ProductCreateForm = ({ handleSubmit, handleChange, handleCategoryChange, values, subOptions, showSub, setValues }) => {
    const { title, description, price, category, categories, subs, shipping, quanity, images, colors, brands, color, brand } = values;
    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <label>Title</label>

                <input
                    type="text"
                    name="title"
                    className='border border-red-300'
                    value={title}
                    onChange={handleChange} />
            </div>
            <div className='container mt-5'>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className='border border-red-300'
                    value={description}
                    onChange={handleChange} />
            </div>

            <div className='container mt-5'>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    className='border border-red-300'
                    value={price}
                    onChange={handleChange} />
            </div>

            <div className='container mt-5'>
                <label>Shipping</label>
                <select name="shipping" className='' onChange={handleChange}>
                    <option>Please Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className='container mt-5'>
                <label>Quantity</label>
                <input type="number" name="quantity" className='border border-red-300' value={quanity} onChange={handleChange} />
            </div>

            <div className='container mt-5'>
                <label>Color</label>
                <select name="color" className='' onChange={handleChange}>
                    <option>Please Select</option>
                    {colors.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>
            {/* //Brands */}
            <div className='container mt-5'>
                <label>Brands</label>
                <select name="brand" className='' onChange={handleChange}>
                    <option>Please Select</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>
            {/* {categories.length} */}
            <div>
                <label>Category</label>
                <select name='category' className='mt-5' onChange={handleCategoryChange}>
                    <option> Please Select</option>
                    {
                        categories.length > 0 && categories.map((c) => (
                            //sending id to backend for particular dropdown list element with value prop
                            <option key={c._id} value={c._id}>
                                {/* displays name but sends and id: */}
                                {c.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            {/* {subOptions.length} */}
            <div>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please Select"
                    value={subs}
                    onChange={(value) => setValues({ ...values, subs: value })}
                >
                    <Option value="One">Opt 1</Option>
                    <Option value="Two"> Opt 2</Option>
                </Select>
            </div>

            <button className=' mt-5 border rounded border-green-600 bg-blue-500 hover:shadow-xl text-white px-4 py-1'>
                Save
            </button>
        </form>
    )
}

export default ProductCreateForm
