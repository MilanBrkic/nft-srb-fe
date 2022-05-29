import React from 'react';
import './css/sort.css'
export default class SortComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sort: "None",
            order: true,
            hideSale: this.props.hideSale ? true : false,
        }
    }

    onSortChange = (toSortBy) => {
        this.state.sort = toSortBy;
        this.forceUpdate()
        this.props.onChange(this.state.sort,this.state.desc);
    }

    onOrderChange = ()=>{
        this.state.desc = !this.state.desc
        this.forceUpdate()
        this.props.onChange(this.state.sort,this.state.desc);
    }

    mapSort = (sort)=>{
        switch (sort) {
            case "name":
                return "Name"
            case "price":
                return "Price"
            case "forSale":
                return "Sale";
            default:
                return "None";
        }
    }

    render(){
        return (
            <div className="sortDiv">
                <p className='sort-p'>Sort: </p> 
                    <div className="dropdown">
                        <button className="dropbtn">{this.mapSort(this.state.sort)}</button>
                        <div className="dropdown-content">
                            <p onClick={()=>{this.onSortChange("name")}}>Name</p>
                            <p onClick={()=>{this.onSortChange("price")}}>Price</p>
                            {this.state.hideSale ? null: <p onClick={()=>{this.onSortChange("forSale")}}>Sale</p>}
                           
                        </div>
                    </div>
                    <p className='sort-p'>Order: </p> 
                <button onClick={this.onOrderChange} className="bold-font sort-btn">{this.state.desc ? "🠗" : "🠕" }</button>
            </div>
        )
    }
}