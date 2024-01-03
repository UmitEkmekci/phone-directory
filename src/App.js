import { useState, useEffect } from "react";
import CreationOfDirectory from "./components/CreationOfDirectory";
import DirectoryList from "./components/DirectoryList";
import InputBar from "./components/InputBar";
import AppStyle from "./styles/App.css"
import Swal from "sweetalert2";
import Pagination from "./components/Pagination";

function App() {

  const [UIList, setUIList] = useState([]);
  const [sortedUIList, setSortedUIList] = useState([]);
  const [index, setIndex] = useState(Date.now());
  const [updatingIndex, setUpdatingIndex] = useState(null);


  useEffect(() => {
    setSortedUIList([...UIList].sort((a, b) => a.name.localeCompare(b.name)))
  }, [UIList]);

  const [currentUIList, setCurrentUIList] = useState([]);
  

  const addDirectoyFunc = (name, surname, prefix, number, favStatus) => {
    const newEntry = { index: index, name, surname, prefix, number, favStatus};
    //! Add SweetAlert2
    Swal.fire({
      title: 'Do you want to add?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        setUIList([...UIList, newEntry]); // Kullanıcı "Evet" dediğinde listeye ekle
        Swal.fire({
          icon: "success",
          title: "Saved successfully!"
        });
        setIndex(Date.now());
      } else if (result.isDenied) {
        Swal.fire('Add cancelled', '', 'info');
        return
        // Kullanıcı "Hayır" dediğinde ekleme işlemi iptal edilir, liste değişmez
      }
    });
    }

  const strValidation = (str) => { //! str == merhaba dünya
    let adjustedStr = str.trimStart().toLowerCase().split(/\s+/); 
    // console.log(adjustedStr); //! [ 'merhaba', 'dünya' ]
    for (let i = 0; i < adjustedStr.length; i++) {
      adjustedStr[i] = adjustedStr[i].charAt(0).toUpperCase() + adjustedStr[i].substring(1); //! ['Merhaba','Dünya']
    }
    return (adjustedStr.join(' ')) //! 'Merhaba Dünya'
  }

  const nameValidate = (name) => {
    let onlyLetters = /^[a-zA-ZöçşğıİÖÇŞĞÜü\s]+$/;
    if((name.length) > 0 && (onlyLetters.test(name))){
      return true
    }
    else {
      return false
    }
  }
  
  const numberValidate = (number) => {
    let onlyNumbers = /^[0-9]+$/;
    if((number.length) > 0 && (onlyNumbers.test(number))){
      return true
    }
    else {
      return false
    }
  }

  const prefixValidate = (number) => {
    if(number){
      return true
    }
    else {
      return false
    }
  }

  const callFunc = () => {
    alert("Calling...")
  }

  const messageFunc = () => {
    alert("Messaging...")
  }

  const deleteFunc = (index) => {
    Swal.fire({
      title: 'Do you want to delete this number?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        setUIList(UIList.filter((item) => item.index !== index));
        Swal.fire({
          icon: "success",
          title: "Deleted successfully!"
        });
        setIndex(Date.now());
      } else if (result.isDenied) {
        Swal.fire('Delete cancelled', '', 'info');
        return
        // Kullanıcı "Hayır" dediğinde ekleme işlemi iptal edilir, liste değişmez
      }
    });
  }

  const updateFunc = (index, updatedName, updatedSurname, updatedPrefix, updatedPhoneNumber) => {
    


    Swal.fire({
      title: 'Do you want to update this number?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        setUIList(UIList.map(item =>
          item.index === index ? { ...item, name: updatedName, surname: updatedSurname, prefix: updatedPrefix, number: updatedPhoneNumber } : item
        ));
        setUpdatingIndex(null);
        Swal.fire({
          icon: "success",
          title: "Updated successfully!"
        });
        setIndex(Date.now());
      } else if (result.isDenied) {
        Swal.fire('Update cancelled', '', 'info');
        return
        // Kullanıcı "Hayır" dediğinde ekleme işlemi iptal edilir, liste değişmez
      }
    })
  }


  return (
    <div className="overall">
      <div className="left-side">
        <CreationOfDirectory addDirectoyFunc={addDirectoyFunc} UIList={UIList} strValidation={strValidation} nameValidate = {nameValidate} numberValidate={numberValidate}  prefixValidate={prefixValidate} />
      </div>
      <div className="mid-side">
        <DirectoryList currentUIList={currentUIList} callFunc={callFunc} messageFunc={messageFunc} deleteFunc={deleteFunc} updatingIndex={updatingIndex} setUpdatingIndex={setUpdatingIndex} updateFunc={updateFunc} strValidation = {strValidation} nameValidate={nameValidate} numberValidate = {numberValidate} prefixValidate={prefixValidate}/>
        <Pagination sortedUIList={sortedUIList} setCurrentUIList={setCurrentUIList}/>
      </div>
      <div className="right-side">
        <InputBar sortedUIList={sortedUIList} />
      </div>
    </div>
  );
}
export default App;