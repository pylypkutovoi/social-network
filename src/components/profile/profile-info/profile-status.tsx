import React, { ChangeEvent } from 'react';
type PropsType= {
  status: string;
  updateUserStatus: (newStatus: string) => void
}

type StateType = {
  editMode: boolean;
  status: string;
}


class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }
  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateUserStatus(this.state.status)
  }
  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div>
        {
          this.state.editMode === false
            ?
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || 'изменить статус'}</span>
          </div>
            :
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
              type="text"/>
          </div>
        }
      </div>

    )
  }
}

export default ProfileStatus;