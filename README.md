# نظام ادارة كتب

## وصف المشروع

مشروع لإدارة الكتب مبني باستخدام **Angular (Frontend)** و **NestJS (Backend)** ويعمل بالكامل داخل **Docker**.  
يتيح النظام إضافة، عرض، تعديل، وحذف الكتب.

---

## التقنيات المستخدمة

1. Angular للواجهات الامامية
2. NestJS للواجهات الخلفية
3. MongoDB قاعدة بيانات لتخزين الكتب (NoSQL)
4. Docker/ Docker Compose لتشغيل المشروع

---

## API

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| GET    | `/books`     | لعرض جميع الكتب والبحث |
| POST   | `/books`     | لانشاء كتاب            |
| GET    | `/books/:id` | لاسترجاع كتاب واحد     |
| PUT    | `/books/:id` | لتحديث كتاب            |
| DELETE | `/books/:id` | لحذف كتاب              |

---

## بنية المشروع

```
tasktwo/
 ├── frontend/
 ├── backend/
 ├── docker-compose.yml
 └── README.md
```

---

## تشغيل المشروع (Docker)

### بناء وتشغيل الدوكر

```bash
docker-compose up --build
```

### Ports

Frontend **80:80**
Backend **3000:3000**

Frontend URL → http://localhost  
Backend URL → http://localhost:3000

---

### صفحة عرض الكتب

![alt text](<Screenshot (1).png>)

### صفحة الاضافة

![alt text](<Screenshot (2).png>)

---

## ملفات Docker

### docker-compose.yml

```yaml
services:
  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - "mongo-data:/data/db"

  backend:
    build: ./book-backend
    command: npm run start:dev
    volumes:
      - ./uploads:/app/uploads
    ports:
      - "3000:3000"
    depends_on:
      - mongo

  frontend:
    build: ./books-front
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

### frontend dockerfile

```yaml
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine


COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/books-front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
```

### backend dockerfile

```yaml
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3000
```

---

- Reef Abdullah Alkhudhairy
