const DB_URL = "https://sharehub-feee9-default-rtdb.firebaseio.com";

function generateRandomKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const part = () => Array.from({length: 4}, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return `VIP-${part()}-${part()}-${part()}`;
}

async function generateAndDisplayKey() {
    const keyVal = generateRandomKey();
    const expiryTime = new Date().getTime() + (24 * 3600 * 1000); // Hạn dùng 24 giờ

    try {
        await fetch(`${DB_URL}/vip_keys/${keyVal}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: keyVal, expiry: expiryTime, used: false })
        });

        document.getElementById('getKeyBtn').style.display = 'none';
        document.getElementById('keyResultBox').style.display = 'block';
        document.getElementById('generatedKey').value = keyVal;
    } catch (err) {
        alert("Lỗi khi tạo Key trên Cloud! Vui lòng thử lại.");
    }
}

function copyKey() {
    const keyInput = document.getElementById('generatedKey');
    keyInput.select();
    document.execCommand('copy');
    alert("Đã sao chép Key VIP thành công!");
}
