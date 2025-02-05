# Print-PDF

Print-PDF is a straightforward JavaScript library designed to facilitate the printing of PDF files using the system's print dialog. It is crafted for easy integration into web applications.

The library employs an iframe technique to load the PDF file and subsequently invoke the print dialog on the iframe. However, on Android browsers, this technique is unsupported. In such cases, the PDF file is loaded as a blob and opened in a new tab, allowing users to print directly from there.

## Installation

To get started, download `print-pdf.js` and include it in your project as follows:

```html
<script src="path/to/print-pdf.js"></script>
```

## Usage

Printing a PDF with Print-PDF is simple. Invoke the `print` method and provide the URL of the PDF you wish to print:

```javascript
PrintPdf.print({
    printable: pdfUrl,
});
```

### Example

```javascript
const pdfUrl = 'https://example.com/sample.pdf';
PrintPdf.print({
    printable: pdfUrl,
});
```

## License

Print-PDF is open-sourced under the MIT License. For more details, refer to the LICENSE file.
