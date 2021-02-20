import {Component} from 'react';


class List extends Component {

    render(){

        return(
            <div>
                <img width={100} height={100} src={this.props.img} alt=""/>
                <img width={100} height={100} src={this.props.img2} alt=""/>
                <p>one img set clear</p>
                <hr/>
            </div>
        )
    }
}

export default List;