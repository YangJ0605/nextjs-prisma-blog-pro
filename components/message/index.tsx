import React from 'react'
import ReactDOM from 'react-dom'

function initModalContainer() {
  let ele = document.getElementById('message-container')
  if (!ele) {
    let container = document.createElement('div')
    container.id = 'message-container'
    document.body.appendChild(container)
    ele = document.getElementById('message-container')

    ReactDOM.render(<MessageContainer />, ele)
  }
}
initModalContainer()

class MessageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nodeList: [],
      activeIDList: []
    }
  }
  render() {
    return (
      <div className='w-screen fixed z-5000 left-0 top-0 flex flex-col'>
        {this.state.nodeList.map((node, index) => (
          <MessageItem
            key={node.id}
            config={node.config}
            show={this.state.activeIDList.indexOf(node.id) > -1}
          ></MessageItem>
        ))}
      </div>
    )
  }
}
function MessageItem(props) {}

export default {}
