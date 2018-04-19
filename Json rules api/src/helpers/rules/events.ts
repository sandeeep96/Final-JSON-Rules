const events = {
    PNR: {
        type: 'PO-Not-REL',
        params: {
            message: 'PO Not REL'
        }
    },
    PNS: {
        type: 'PO-Not-Started',
        params: {
            message: 'PO Not Started'
        }
    },
    PNC: {
        type: 'PO-Not-Completed',
        params: {
            message: 'PO Not Completed'
        }
    },
    QNC: {
        type: 'QC-Not-Completed',
        params: {
            message: 'QC Not Completed'
        }
    },
    SDNC: {
        type: 'Stock-Del-Not-CRTD',
        params: {
            message: 'Stock: Del Not CRTD'
        }
    }
}

export { events };