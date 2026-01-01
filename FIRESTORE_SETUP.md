# Firestore Setup Instructions

## Firestore Security Rules

Firestore'da yorumların kaydedilmesi için güvenlik kurallarını ayarlamanız gerekiyor.

### Firebase Console'da Güvenlik Kuralları

1. Firebase Console'a gidin: https://console.firebase.google.com/
2. Projenizi seçin: `renazteknik-82233`
3. Sol menüden "Firestore Database" seçin
4. "Rules" sekmesine gidin
5. Aşağıdaki kuralları ekleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Comments collection - allow read for everyone, write for everyone (temporarily for testing)
    match /comments/{commentId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
    }
  }
}
```

### Production için Daha Güvenli Kurallar

Daha güvenli bir yapı için şu kuralları kullanabilirsiniz (rate limiting ve validation eklenmiş):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{commentId} {
      // Herkes yorumları okuyabilir
      allow read: if true;
      
      // Yeni yorum ekleme - basit validation
      allow create: if request.resource.data.keys().hasAll(['name', 'service', 'comment', 'date', 'replies'])
                   && request.resource.data.comment is string
                   && request.resource.data.comment.size() > 0
                   && request.resource.data.comment.size() <= 5000
                   && request.resource.data.service is string
                   && request.resource.data.service.size() > 0;
      
      // Yorum güncelleme - sadece replies eklenebilir
      allow update: if request.resource.data.diff(resource.data).affectedKeys().hasOnly(['replies'])
                   && request.resource.data.replies is list;
    }
  }
}
```

## Test Etme

1. Güvenlik kurallarını kaydedin
2. Sayfayı yenileyin
3. Yeni bir yorum ekleyin
4. Browser console'u açın (F12) ve hataları kontrol edin
5. Firebase Console > Firestore Database'de `comments` koleksiyonunu kontrol edin

## Hata Ayıklama

Eğer yorumlar hala görünmüyorsa:

1. Browser console'u açın (F12 > Console)
2. Yorum göndermeyi deneyin
3. Console'da şu logları arayın:
   - "Adding comment to Firestore:"
   - "Comment data to save:"
   - "Comment added successfully with ID:"
   - Herhangi bir hata mesajı

4. Network sekmesinde Firestore isteklerini kontrol edin
5. Firebase Console > Firestore Database'de "comments" koleksiyonunun oluştuğunu kontrol edin

## Önemli Notlar

- İlk yorum eklendiğinde `comments` koleksiyonu otomatik olarak oluşturulur
- Güvenlik kuralları değişikliği birkaç saniye sürebilir
- Test için ilk kuralları kullanın, production'da daha güvenli kurallar kullanın

