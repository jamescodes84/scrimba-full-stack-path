// Link to Figma File for project https://www.figma.com/design/twasy8Bca4hW7gunLFSLoY/Color-Scheme-Generator?node-id=2-1155


const colorPickerInput = document.getElementById('color-picker-input')
const schemaDropdown = document.getElementById("schema-dropdown")
const schemaButton = document.getElementById('schema-button')
colorPickerInput.addEventListener('input', () => {
    console.log("Selected Color:", colorPickerInput.value)
})

schemaDropdown.addEventListener('change', () => {
    console.log("Selected Theme:", schemaDropdown.value)
})

schemaButton.addEventListener('click', () => {
    console.log("Get Schema Button Clicked")
})
