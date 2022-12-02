import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import BgOptions from './BgOptions';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import TextareaAutosize from 'react-textarea-autosize';

function Note({ id, title, content, noteBgClr, noteBgImg, timeStamp, onEdit, onDelete, }) {

  const [updateNote, setUpdateNote] = useState({})
  const [isEditToggled, setIsEditToggled] = useState(false)
  const [isBgOptToggled, setIsBgOptToggled] = useState(false)
  const [bgColor, setBgColor] = useState(noteBgClr)
  const [bgImage, setBgImage] = useState(noteBgImg)

  // Edit Note
  function edit() {

    setUpdateNote({
      id: id,
      title: title,
      content: content,
      bgColor: noteBgClr,
      bgImage: noteBgImg,
    })

    setIsEditToggled(true)
  }

  // Update Note
  function save(event) {

    if (updateNote.title === '' && updateNote.content === '') {
      console.log("err_msg: empty input fields!")  //: err_msg: empty input fields!
    }
    else {

      // Fetching date-time data
      const getDate = new Date()
      const getTime = getDate.toLocaleTimeString()
      const formatTime = getTime.substr(0, 5) + ' ' + getTime.substr(-2)
      const formatDate = getDate.toDateString().substr(4, 6)

      const timeStamp = {
        time: formatTime,
        date: formatDate,
      }

      onEdit({ ...updateNote, bgColor, bgImage, timeStamp })
      setIsEditToggled(false)

      setUpdateNote({
        id: null,
        title: '',
        content: '',
        bgColor: '',
        bgImage: '',
      })
    }

    event.preventDefault()
  }

  // Get BgColor 
  function getBgColor(color) {
    setBgColor(color)
  }

  // Get BgImage 
  function getBgImage(image) {
    setBgImage(image)
  }

  // Toggle BgOptions
  function toggeBgOptions() {
    setIsBgOptToggled(!isBgOptToggled)
  }

  // Close Note
  function close() {
    setBgColor(noteBgClr)
    setBgImage(noteBgImg)

    setIsEditToggled(false)
  }

  // Set Temporary Notes
  function handleChange(e) {
    const { name, value } = e.target

    setUpdateNote(preValue => {
      return {
        ...preValue,
        [name]: value,
      }
    })

  }

  // Note Component
  return (
    <div className={isEditToggled ? 'edit_toggled_container' : `note note-bg-${bgColor} note-bg-img-${bgImage} note-container`}>
      {isEditToggled ?
        (
          <>
            {/*------- Edit Note view -------*/}
            <div className={`editNote editNote-bg-${bgColor}`}>
              <form className="editForm" onSubmit={(event) => { save(event) }}>
                <div className={`input-container editNote-bg-img-${bgImage}`}>
                  {/* Title Input Area */}
                  <input
                    type='text'
                    value={updateNote.title}
                    placeholder='Title'
                    name='title'
                    onChange={handleChange}
                  />

                  {/* Content Input Area */}
                  <TextareaAutosize
                    name='content'
                    value={updateNote.content}
                    placeholder='Note'
                    onChange={handleChange}
                  />

                  {/* Time Stamp  */}
                  {
                    <div className={timeStamp ? `time-stamp visible` : `time-stamp`}>
                      <Tooltip title={timeStamp && `Created ${timeStamp.date}`}>
                        <span>Edited {timeStamp && timeStamp.time}</span>
                      </Tooltip>
                    </div>
                  }

                </div>

                {/* Buttons [Save, Close]  */}
                <div className='form-btn'>
                  <Tooltip title='Background options'>
                    <Button className='btn btn-bgOptions' onClick={toggeBgOptions}><ColorLensOutlinedIcon /></Button>
                  </Tooltip>
                  {isBgOptToggled &&
                    <BgOptions
                      selectedBgColor={getBgColor}
                      activeBgColor={bgColor}
                      selectedBgImage={getBgImage}
                      activeBgImage={bgImage}
                    />}

                  <Button type='submit'>Save</Button>
                  <Button onClick={close}>Close</Button>
                </div>
              </form>
            </div>
          </>
        )
        :
        (<>
          {/*-------Individual Note View -------*/}
          <h1>{title}</h1>
          <p>{content}</p>

          {/* Delete Btn  */}
          <Tooltip title="Delete">
            <Button className='btn btn-delete' onClick={() => onDelete(id)}><DeleteIcon /></Button>
          </Tooltip>

          {/* Edit Btn  */}
          <Tooltip title="Edit">
            <Button className='btn btn-edit' onClick={edit}><EditIcon /></Button>
          </Tooltip>
        </>
        )
      }
    </div>
  )
}

export default Note