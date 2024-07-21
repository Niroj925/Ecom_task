 const Item='/item';
 const getItem=(id)=>`/item/${id}`;
 const allPackage='/package'
 const packages=(id)=>`/package/${id}`;
 const packagByStatus=(status)=>`/package?status=${status}`
 const customer='/customer'

 export { Item,getItem,allPackage,packages,customer,packagByStatus}