
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Select from 'react-select';



const FilterSelector = ({selectedCategory, setSelectedCategory,}) => {
  
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
      backgroundColor: '#ff000000',
      
      borderRadius: '0.75rem',
      textAlign: 'left',  
      boxShadow: 'none', 
      border: '0px solid #E5E7EB',
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


  const handleChange = (selectedOption) => {
    setSelectedCategory(selectedOption); 
    
  };

  return (
    <Select
      options={serviceCategories.map((category) => ({
        label: category.label,
        value: category.value,
      }))}
      styles={styles}
      placeholder="Filter by category"
      isSearchable
      name="category"
      onChange={handleChange} 
        value={selectedCategory}
      required
    />
  );
};

FilterSelector.propTypes = {
  selectedCategory : PropTypes.string,
  setSelectedCategory : PropTypes.func
}
export default FilterSelector;
