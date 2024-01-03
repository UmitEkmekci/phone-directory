import React, { useRef, useState } from 'react'
import CreationOfDirectoryStyle from '../styles/CreationOfDirectory.css'
import Swal from 'sweetalert2';


const CreationOfDirectory = ({ addDirectoyFunc, UIList, strValidation, nameValidate, numberValidate, prefixValidate }) => {

  const [givenName, setGivenName] = useState("");
  const [givenSurname, setGivenSurname] = useState("");
  const [givenPrefix, setGivenPrefix] = useState("");
  const [givenNumber, setGivenNumber] = useState("");

  const addNameRef = useRef(null);

  const catchGivenName = (e) => {
    setGivenName(strValidation(e.target.value));
  }

  const catchGivenSurname = (e) => {
    setGivenSurname(strValidation(e.target.value));
  }

  const catchPrefixCode = (e) => {
    setGivenPrefix(e.target.value);
  }

  const catchGivenNumber = (e) => {
    setGivenNumber(e.target.value);
  }

  const [favStatus,setFavStatus] = useState(false);

  const setFavStatusFunc = (e) => {
    e.preventDefault();
    setFavStatus(!favStatus)
  }

  const addDirectoryWithValidation = (e) => {
    e.preventDefault();

    const isNameValid = nameValidate(givenName);

    const isSurnameValid = nameValidate(givenSurname);

    const isNumberValid = numberValidate(givenNumber);

    const isPrefixValid = prefixValidate(givenPrefix);

    let errorMessage = "";

    if (!isNameValid) {
      errorMessage += "İsim "
    }

    if (!isSurnameValid) {
      errorMessage += "Soyisim "
    }

    if (!isNumberValid) {
      errorMessage += "Numara "
    }

    if (!isPrefixValid) {
      errorMessage += "Prefix "
    }

    if (errorMessage != "") {
      errorMessage += "hatalı!"
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: errorMessage,
        confirmButtonText: 'Tamam'
      });
      return
    }

    // Numara zaten listede var mı diye kontrol et
    let checkNumberInUIList = UIList.some((item) => item.number === givenNumber);
    if (checkNumberInUIList) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'This number has been already saved.',
        confirmButtonText: 'Tamam'
      });
      return;
    } 
    else {
      addDirectoyFunc(givenName, givenSurname, givenPrefix, givenNumber, favStatus);
      console.log(typeof favStatus);
      console.log(favStatus);
      setGivenName("");
      setGivenSurname("");
      setGivenPrefix("");
      setGivenNumber("");
      setFavStatus(false);
    }
  }

  const refreshFunc = (e) => {
    e.preventDefault();
    if (givenName !== "" || givenSurname !== "" || givenNumber !== "") {
      addNameRef.current.focus();
      setGivenName("");
      setGivenSurname("");
      setGivenPrefix("");
      setGivenNumber("");
    }
  }

  return (
    <div className='directory-card'>
      <form onSubmit={addDirectoryWithValidation}>
        <label htmlFor="">Give Name</label>
        <input ref={addNameRef} type="text" value={givenName} onChange={catchGivenName} />
        <label htmlFor="">Give Surname</label>
        <input type="text" value={givenSurname} onChange={catchGivenSurname} />
        <label htmlFor="">Give Country Belong To The Number</label>
        <select value={givenPrefix} onChange={catchPrefixCode}>
          <option value="" disabled hidden>Please Pick A Country</option>
          <option value="TR">Türkiye</option>
          <option value="VI">ABD Virgin Adaları</option>
          <option value="AF">Afganistan</option>
          <option value="AX">Aland Adaları</option>
          <option value="DE">Almanya</option>
          <option value="US">Amerika Birleşik Devletleri</option>
        </select>
        <label htmlFor="">Give Number</label>
        <input type="text" value={givenNumber} onChange={catchGivenNumber} />
        <label className='add-label' htmlFor="">Add Favorite List</label><button className="favoriteStar" onClick={setFavStatusFunc}>
          <img width="20" height="20" alt="star-image" src= {favStatus ? "https://www.freepnglogos.com/uploads/star-png/star-icon-23.png" : "data:image/png;base64,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"}/>
        </button>

        <br></br>
        <button type="submit">Add</button>
        <br></br>
        <button type="button" onClick={refreshFunc}>Refresh</button>
      </form>
    </div>
  )
}

export default CreationOfDirectory