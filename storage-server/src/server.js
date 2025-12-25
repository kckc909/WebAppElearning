import app from './app.js';
import config from './config/index.js';

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`                                                    
    📦 Storage Server

    🌐 Server:    http://localhost:${PORT}                  
    📁 Files:     http://localhost:${PORT}/files            
    🎨 Admin UI:  http://localhost:${PORT}/admin            
    📊 API Info:  http://localhost:${PORT}/api/info         
    📂 Structure: http://localhost:${PORT}/api/structure    

    📂 Upload Dir: ${config.uploadDir}
    `);
});
