const OptionSelector = ({ item,optionTitle }) => {
  return (
    <>
      <option style={{display:"none"}} disabled selected value="">
        {optionTitle}
      </option>
      <option value={item?._id ?? item}>{item?.name ?? item}</option>
    </>
  );
};

export default OptionSelector;
