import React from 'react'
import EachNumber from './EachNumber'

const DirectoryList = ({currentUIList,callFunc,messageFunc,deleteFunc,setUpdatingIndex,updatingIndex,updateFunc,strValidation,nameValidate,numberValidate,prefixValidate}) => {
  return (
    <div>
      {currentUIList.map(eachItem => (
        <EachNumber 
        key={eachItem.index}
        eachItem={eachItem}
        callFunc={callFunc} 
        messageFunc={messageFunc} 
        deleteFunc = {deleteFunc} 
        setUpdatingIndex = {setUpdatingIndex}
        isUpdating = {eachItem.index===updatingIndex}
        updateFunc = {updateFunc}
        strValidation = {strValidation}
        nameValidate = {nameValidate}
        numberValidate = {numberValidate}
        prefixValidate = {prefixValidate}
        currentUIList = {currentUIList}
        />        
      ))}
    </div>
  )
}

export default DirectoryList