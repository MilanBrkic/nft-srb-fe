import React from 'react';
import './css/sort.css'
export default class SortComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sort: "None",
            order: true
        }
    }

    onSortChange(toSortBy){
        this.state.sort = toSortBy;
        this.forceUpdate()
    }

    render(){
        return (
            <div className="sortDiv">
                <p className='sort-p'>Sort: </p> 
                    <div className="dropdown">
                        <button className="dropbtn bold-font">{this.state.sort}</button>
                        <div className="dropdown-content">
                            <p onClick={()=>{this.onSortChange("Name")}}>Name</p>
                            <p onClick={()=>{this.onSortChange("Price")}}>Price</p>
                            <p onClick={()=>{this.onSortChange("Sale")}}>Sale</p>
                        </div>
                    </div>
                    <p className='sort-p'>Order: </p> 
                <button onClick={()=>{
                    this.state.order = !this.state.order
                    this.forceUpdate()
                    }} className="bold-font sort-btn">{this.state.order ? "🠕" : "🠗"}</button>
            </div>
        )
    }
}