// This is a mock service. In a real application, you would connect to a database
let admins = [];
let idCounter = 1;

const getAllAdmins = async () => {
  return admins;
};

const getAdminById = async (id) => {
  return admins.find(admin => admin.id === id);
};

const createAdmin = async (adminData) => {
  const newAdmin = {
    id: idCounter.toString(),
    ...adminData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  admins.push(newAdmin);
  idCounter++;
  return newAdmin;
};

const updateAdmin = async (id, adminData) => {
  const index = admins.findIndex(admin => admin.id === id);
  if (index === -1) return null;

  admins[index] = {
    ...admins[index],
    ...adminData,
    updatedAt: new Date()
  };
  return admins[index];
};

const deleteAdmin = async (id) => {
  const index = admins.findIndex(admin => admin.id === id);
  if (index === -1) return null;

  const deletedAdmin = admins[index];
  admins = admins.filter(admin => admin.id !== id);
  return deletedAdmin;
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin
}; 