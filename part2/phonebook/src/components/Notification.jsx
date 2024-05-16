/* eslint-disable react/prop-types */
const Notification = ({ message, type }) => {
  console.log(`in notification, message:${message}, type: ${type}`);
  if (message === null) {
    return null
  }

  if (type === "error")return (
    <div className="error">
      {message}
    </div>
  )
  else return(
    <div className="successful">
      {message}
    </div>
  )
}

export default Notification