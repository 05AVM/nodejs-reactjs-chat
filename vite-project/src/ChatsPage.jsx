import {PrettyChatWindow} from 'react-chat-engine-pretty'
const ChatsPage = (props) => {
  

    return (
      <div style= {{height: '100vh'}} >
      <PrettyChatWindow
      projectId='a16ca464-4215-443f-b815-4d6d1a96e379'
      username={props.user.username}
      secret={props.user.secret}
      style={{height:'100%'}}/>
      </div>
    )
  }
  export default ChatsPage;