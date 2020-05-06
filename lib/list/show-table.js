const showTable = (data) => {
    const tableData = data.map((item) => {
        const [name, version] = item.split('@');
        return {
            appName: name,
            version: version || 'none'
        };
    });
    console.table(tableData);
};

module.exports = showTable;
