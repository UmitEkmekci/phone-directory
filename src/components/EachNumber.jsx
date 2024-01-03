import React, { useState } from 'react';
import Swal from 'sweetalert2';
import EachNumberCssStyle from '../styles/EachNumber.css'


const EachNumber = ({eachItem ,callFunc, messageFunc, deleteFunc, setUpdatingIndex, isUpdating, updateFunc, strValidation,nameValidate,numberValidate,prefixValidate }) => {

  const [updatedName, setUpdatedName] = useState(eachItem.name);
  const [updatedSurname, setUpdatedSurname] = useState(eachItem.surname);
  const [updatedPrefix, setUpdatedPrefix] = useState(eachItem.prefix)
  const [updatedNumber, setUpdatedNumber] = useState(eachItem.number);

  const catchUpdatedName = (e) => {
    setUpdatedName(strValidation(e.target.value));
  }

  const catchUpdatedSurname = (e) => {
    setUpdatedSurname(strValidation(e.target.value));
  }

  const catchUpdatedPrefix = (e) => {
    setUpdatedPrefix(e.target.value)
  }

  const catchUpdatedNumber = (e) => {
    let onlyNumbers = /^[0-9]+$/;
    if (onlyNumbers.test(e.target.value)) {
      setUpdatedNumber(e.target.value);
    }
  }

  const updateDirectoryWithValidation = (e) => {
    e.preventDefault();

    let errorMessage = "";

    const isUpdatedNameValid = nameValidate(updatedName);
    const isUpdatedSurnameValid = nameValidate(updatedSurname);
    const isUpdatedPrefixValid = prefixValidate(updatedPrefix);
    const isUpdatedNumberValid = numberValidate(updatedNumber);
  
    if (!isUpdatedNameValid) {
      errorMessage += "İsim "
    }
  
    if (!isUpdatedSurnameValid) {
      errorMessage += "Soyisim ";
    }
  
    if (!isUpdatedPrefixValid) {
      errorMessage += "Prefix "
    }
  
    if (!isUpdatedNumberValid) {
      errorMessage += "Numara "
    }
  
    if (errorMessage !== "") {
      errorMessage += "hatalı!"
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: errorMessage,
        confirmButtonText: 'OK'
      });
      return
    } 
    else {
      updateFunc(eachItem.index, updatedName, updatedSurname, updatedPrefix, updatedNumber);
    }
  }

  return isUpdating ?
    (
      <form className='updated-screen' onSubmit={updateDirectoryWithValidation}>
        <label htmlFor="">Update Name</label>
        <input type="text" value={updatedName} onChange={catchUpdatedName} />
        <label htmlFor="">Update Surname</label>
        <input type="text" value={updatedSurname} onChange={catchUpdatedSurname} />
        <label htmlFor="">Updated Prefix</label>
        <select value={updatedPrefix} onChange={catchUpdatedPrefix}>
          <option value="" disabled hidden>Please Pick A Country</option>
          <option value="TR">Türkiye</option>
          <option value="VI">ABD Virgin Adaları</option>
          <option value="AF">Afganistan</option>
          <option value="AX">Aland Adaları</option>
          <option value="DE">Almanya</option>
          <option value="US">Amerika Birleşik Devletleri</option>
        </select>
        <label htmlFor="">Update Number</label>
        <input type="text" value={updatedNumber} onChange={catchUpdatedNumber} />
        <button>Save Update</button>
      </form>
    )
    :
    (
      <div className='directory-list'>
        <div>{eachItem.index}-{eachItem.name}-{eachItem.surname}-{eachItem.number}-{eachItem.prefix}--{eachItem.favStatus.toString()}</div>
        <button onClick={callFunc}>Call</button>
        <button onClick={messageFunc}>Message</button>
        <button onClick={() => deleteFunc(eachItem.index)}>Delete</button>
        <button onClick={() => setUpdatingIndex(eachItem.index)}>Update</button>
      </div>
    )
}

export default EachNumber