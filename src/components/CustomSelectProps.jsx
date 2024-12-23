
import { useEffect, useState } from 'react';
import Select from 'react-select';



const CustomSelectProp = () => {
  
  const [serviceCategories, setServiceCategories] = useState([])
  useEffect(()=>{
   fetch('category.json')
   .then(res => res.json())
   .then(data => setServiceCategories(data))
  },[])


  const styles = {
    control: (base) => ({
      ...base,
      height : '42px',
      
      borderRadius: '0.75rem',
      textAlign: 'left',  
      boxShadow: 'none', 
      border: '1px solid #E5E7EB',
      '&:hover': {
        borderColor: '#E5E7EB', 
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '0.75rem', 
    }),
    option: (base, { isSelected }) => ({
      ...base,
      borderRadius: '0.55rem',
      textAlign: 'left', 
      backgroundColor: isSelected ? '#FA6500' : '#ffffff00', 
      color: isSelected ? 'white' : 'black', 
      '&:hover': {
        backgroundColor: '#FEE0CC', 
        color: 'black', 
      },
    }),
  };

  return (
    <Select
      options={serviceCategories.map((category) => ({
        label: category.label,
        value: category.value,
      }))}
      styles={styles}
      placeholder="Select a service category"
      isSearchable
      name="category"
      required
    />
  );
};

export default CustomSelectProp;
