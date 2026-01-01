export const activeTab = $state({
    _id: "basic",
    get: () => activeTab._id,
    set: (id: string) => activeTab._id = id,
    isActive: (id: string) => activeTab._id === id
});

export const isModalOperating = $state({
    _isModal: false,
    get: () => isModalOperating._isModal,
    set: (value: boolean) => isModalOperating._isModal = value
});
