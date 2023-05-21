
BULK INSERT [dbo].[GoldHistories]

FROM 'C:\Users\asus\Downloads\gituploads\shinkurtMarket\query\datas\Gold.csv' 

WITH (FIRSTROW = 1,

FIELDTERMINATOR = ',',

ROWTERMINATOR = '\n',

BATCHSIZE = 25000,

MAXERRORS = 2);