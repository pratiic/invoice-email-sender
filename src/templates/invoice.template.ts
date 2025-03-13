export const generateInvoiceTemplate = () => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }
                .invoice-container {
                    max-width: 700px;
                    margin: auto;
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                h1 { color: #007bff; }
                .info { margin-bottom: 20px; }
                .table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                .table th, .table td {
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: left;
                }
                .total {
                    text-align: right;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div style={{ fontFamily: 'Arial, sans-serif', margin: '40px', color: '#000', maxWidth: '800px', margin: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>TAX INVOICE</h1>
          <p>{invoice.companyName}<br/>{invoice.companyAddress}</p>
        </div>
        <div>
          <p>Invoice Date - {invoice.invoiceDate}<br/>Invoice Number - {invoice.invoiceNumber}</p>
          <p>Reference: {invoice.reference}</p>
          <p>ABN: {invoice.abn}</p>
          <p>{invoice.clientName}<br/>Attention: {invoice.clientContact}</p>
        </div>
      </div>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>GST</th>
            <th>Amount AUD</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.description}</td>
              <td>{item.quantity.toFixed(2)}</td>
              <td>{item.unitPrice.toFixed(2)}</td>
              <td>{item.gst}%</td>
              <td>{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <p>Subtotal: {invoice.subtotal.toFixed(2)}</p>
        <p>TOTAL GST {invoice.gstRate}%: {invoice.totalGst.toFixed(2)}</p>
        <h2>TOTAL AUD: {invoice.total.toFixed(2)}</h2>
      </div>

      {/* Payment Info */}
      <div style={{ marginTop: '20px' }}>
        <p>Due Date: {invoice.dueDate}</p>
        <p>Bank Account Name: {invoice.bankAccountName}<br/>
           BSB Number: {invoice.bsbNumber}<br/>
           Account Number: {invoice.accountNumber}</p>
      </div>

      {/* Payment Advice */}
      <div style={{ borderTop: '1px dashed #000', paddingTop: '20px', marginTop: '40px' }}>
        <h2>PAYMENT ADVICE</h2>
        <p>To: {invoice.clientName}<br/>Attention: {invoice.clientContact}</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td>Customer</td>
            <td>{invoice.companyName}</td>
          </tr>
          <tr>
            <td>Invoice Number</td>
            <td>{invoice.invoiceNumber}</td>
          </tr>
          <tr>
            <td>Amount Due</td>
            <td>{invoice.total.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Due Date</td>
            <td>{invoice.dueDate}</td>
          </tr>
          <tr>
            <td>Amount Enclosed</td>
            <td>______________________</td>
          </tr>
        </table>
        <p>Enter the amount you are paying above</p>
      </div>
    </div>
        </body>
        </html>
    `;
};
