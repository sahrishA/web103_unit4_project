const API_BASE_URL = 'postgresql://postgres:vmDJSvuCZcXYgEyrOlNHWroIlMKdTVPb@junction.proxy.rlwy.net:36870/railway'|| 'http://localhost:5000/api';
//const API_BASE_URL= 'http://localhost:5000/api'
export const getCustomItems=async()=>{
    const response = await fetch(`${API_BASE_URL}/custom_items`);
    return await response.json();
};
export const getCustomItemById = async(id)=>{
    const response =await fetch(`${API_BASE_URL}/custom_items/${id}`);
    return await response.json();
};
export const createCustomItem=async(item)=>{
    const response =await(`${API_BASE_URL}/custom_items`,{
    method:'POST',
    header:{'Content-Type':'application/json'},
    body:JSON.stringify(item)
    });
    return await response.json();
}
export const updateCustomItem = async (id, updatedItem) => {
    const response = await fetch(`${API_BASE_URL}/custom_items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    });
    return await response.json();
  };
  
  export const deleteCustomItem = async (id) => {
    await fetch(`${API_BASE_URL}/custom_items/${id}`, { method: 'DELETE' });
  };