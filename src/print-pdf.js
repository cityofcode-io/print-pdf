class PrintPdf {
    constructor() {
        this.defaultOptions = {
            printable: null, // set url in print()
            frameId: 'print-pdf-iframe',
            documentTitle: 'Document',
            onError: (error) => console.error(error),
            onPrintDialogClose: () => { },
        };
    }

    // Public method
    print(userOptions) {
        const options = this.#mergeOptions(userOptions);
        if (!options.printable) {
            throw new Error('Missing printable content or URL.');
        }

        // Fallback for Android Chrome: open the PDF in a new tab instead of auto-printing.
        if (this.#isSupportedAndroidBrowser()) {
            window.open(options.printable, '_blank');
            options.onPrintDialogClose();
            return;
        }

        const iframe = this.#createIframe(options);
        let url = options.printable;
        if (!/^https?:\/\//.test(url) && !url.startsWith('blob:')) {
            url = window.location.origin + (url.startsWith('/') ? url : '/' + url);
        }
        iframe.src = url;
        document.body.appendChild(iframe);

        iframe.onload = () => {
            // Brief delay before triggering the print dialog.
            setTimeout(() => {
                try {
                    const iframeWindow = iframe.contentWindow;
                    iframeWindow.focus();
                    iframeWindow.print();
                } catch (error) {
                    options.onError(error);
                    iframe.remove();
                } 
            }, 100);
        };

        iframe.onerror = (error) => {
            options.onError(error);
            iframe.remove();
        };
    }

    // Private methods
    #mergeOptions(userOptions) {
        return { ...this.defaultOptions, ...userOptions };
    }

    #isSupportedAndroidBrowser() {
        const ua = navigator.userAgent;
        const isAndroid = /android/i.test(ua);
        const isChrome = /chrome/i.test(ua);
        const isOpera = /opera|opr/i.test(ua);
        const isSamsung = /samsungbrowser/i.test(ua);

        return isAndroid && (isChrome || isOpera || isSamsung);
    }

    #createIframe(options) {
        // Remove any existing iframe with the same frameId.
        const existing = document.getElementById(options.frameId);
        if (existing) existing.remove();
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.opacity = '0';
        iframe.style.border = 'none';

        iframe.id = options.frameId;
        return iframe;
    }
}

const printPdfInstance = new PrintPdf();
window.PrintPdf = printPdfInstance;
export default printPdfInstance;