AI-Predictive-Climate-Impact/
│── backend/                   
│   ├── models/                
│   │   ├── climate_model.py   # Predictive ML model
│   │   ├── preprocess.py      # Data preprocessing script
│   │   ├── train.py           # Model training script
│   │   ├── requirements.txt   # Python dependencies
│   │
│   ├── api/                   
│   │   ├── server.py          # Flask API entry point
│   │   ├── routes.py          # API routes
│   │   ├── config.py          # Configurations
│   │
│   ├── database/              # Database connections
│   │   ├── db_config.py       # MySQL configuration (Python)
│   │   ├── schema.sql         # MySQL database schema
│   │   ├── seed.sql           # Sample data for testing
│   │
│   ├── utils/                 # Utility functions
│   ├── .env                   # Environment variables
│   ├── README.md              # Backend documentation
│
│── frontend/                  
│   ├── assets/                
│   ├── css/                   
│   │   ├── styles.css         
│   │
│   ├── js/                    
│   │   ├── app.js             
│   │   ├── api.js             
│   │   ├── charts.js          
│   │
│   ├── index.html             
│   ├── dashboard.html         
│   ├── about.html             
│   ├── README.md              
│
│── docs/                      
│   ├── report.pdf             
│   ├── dataset_description.md 
│
│── dataset/                   
│   ├── climate_data.csv       
│   ├── urban_impact.csv       
│
│── scripts/                   
│   ├── deploy.sh              
│   ├── setup.sh               
│
│── .gitignore                 
│── LICENSE                    
│── README.md                  




pip install -r models/requirements.txt

mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql

python models/train.py

python api/server.py
