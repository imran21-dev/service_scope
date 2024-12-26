
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Select from 'react-select';



const Up = ({category}) => {
  
  const [serviceCategories, setServiceCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(()=>{
   fetch('/category.json')
   .then(res => res.json())
   .then(data => {
    setServiceCategories(data)
   
    const defaultCategory = data.find((cate) => cate.label === category)
    if (defaultCategory) {
        setSelectedCategory({
            label : defaultCategory.label,
            value: defaultCategory.value
        })
    }
   })
  },[category])


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
      placeholder="Category"
      isSearchable
      value={selectedCategory}
      onChange={(selectedOption) => setSelectedCategory(selectedOption)} 
      name="category"
      required
    />
  );
};
Up.propTypes = {
    category :PropTypes.string
}
export default Up;
