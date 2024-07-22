const handleSearch = (event, setSearch) => {
    const filter = event.target.value.toLowerCase()
    setSearch(filter)
}

export default {
    handleSearch
}
