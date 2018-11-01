import React ,{Component} from 'react';

export class Pagination extends React.Component {
    
    render(){
        const stylepagination = {
            padding: 15,
        }
        const stylea = {
            padding: 8,
            cursor: 'pointer'
        }

        return(
        <div>
             <div style={stylepagination}>
                    <a style={stylea} onClick={this.props.handlePagesLess}>&laquo;</a>
                    {this.props.renderPageNumbers}
                    <a style={stylea} onClick={this.props.handlePages} >&raquo;</a>
                </div>
            </div>
        );}
}

export default Pagination;