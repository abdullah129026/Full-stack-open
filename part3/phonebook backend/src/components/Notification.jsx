const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    background: type === 'error' ? 'lightcoral' : 'lightgreen',
    color: type === 'error' ? 'darkred' : 'darkgreen'
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
