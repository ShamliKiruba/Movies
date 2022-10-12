export const fetchData = async (url = '', data = {}) => {
    const response = await fetch(url);
    return response.json(); 
};