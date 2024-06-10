export const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Could not fetch users');
      }
      const users = await response.json();
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const fetchPrinters = async () => {
    try {
      const response = await fetch('/api/printers');
      if (!response.ok) {
        throw new Error('Could not fetch printers');
      }
      const printers = await response.json();
      return printers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admins');
      if (!response.ok) {
        throw new Error('Could not fetch admins');
      }
      const admins = await response.json();
      return admins;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  