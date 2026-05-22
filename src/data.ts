// ═══════════════════════════════════════════════════════════════
//  MAVERA ERP — SaaS Platform Veri Katmanı v3
// ═══════════════════════════════════════════════════════════════

export type Currency = "TRY" | "USD" | "EUR";
export type FirmaTipi = "sahis" | "kobi" | "orta" | "kurumsal";
export type RolTipi = "SuperAdmin" | "FirmaAdmin" | "Muhasebe" | "Finans" | "Satis" | "Operasyon" | "Personel" | "Görüntüleme";
export type ModulKey =
  | "dashboard" | "muhasebe" | "cari" | "banka" | "kasa" | "stok" | "satis"
  | "teklif" | "siparis" | "satinalma" | "fatura" | "tahsilat" | "odeme"
  | "crm" | "hr" | "gorev" | "takvim" | "proje" | "arge" | "evrak"
  | "urun" | "hizmet" | "rapor" | "ai" | "ayar" | "fisOkuma" | "botYonetimi";

// ═══════════════════════════════════════════════════════════════
// PLATFORM (SÜPER ADMIN)
// ═══════════════════════════════════════════════════════════════
export interface PlatformKullanici {
  id: string; email: string; sifre: string; ad: string; soyad: string;
  rol: "SuperAdmin" | "Destek"; status: "Aktif" | "Pasif";
  sonGiris: string; ipAdresleri: string[];
}

export interface Firma {
  id: string; platformId: string; ad: string; unvan: string;
  vergiNo: string; vergiDairesi: string; telefon: string; adres: string;
  sektor: string; tip: FirmaTipi; logo: string;
  paraBirimi: Currency; locale: "tr" | "en";
  moduller: ModulKey[];
  kullaniciLimiti: number; diskLimitiMB: number;
  paket: "Starter" | "Professional" | "Enterprise";
  status: "Aktif" | "Pasif" | "Deneme";
  olusturmaTarihi: string; sonGiris: string;
  planBitisTarihi: string;
}

// ═══════════════════════════════════════════════════════════════
// FİRMA KULLANICILARI
// ═══════════════════════════════════════════════════════════════
export interface Kullanici {
  id: string; firmaId: string; email: string; sifre: string;
  ad: string; soyad: string; avatar: string;
  rol: RolTipi; departman: string; unvan: string;
  telefon: string; dahili: string;
  yetkiliModuller: ModulKey[];
  yetkiliSayfalar: string[];
  twoFA: boolean; twoFASecret: string;
  status: "Aktif" | "Pasif" | "Beklemede";
  sonGiris: string; girisSayisi: number;
  sonIp: string; sonTarayici: string;
  olusturmaTarihi: string;
}

export interface AuditLog {
  id: string; kullaniciId: string; kullaniciAd: string;
  firmaId: string; modul: string; islem: string;
  detay: string; ip: string; tarayici: string;
  tarih: string;
}

// ═══════════════════════════════════════════════════════════════
// FİNANS & MUHASEBE
// ═══════════════════════════════════════════════════════════════
export interface HesapPlani {
  kod: string; ad: string; tip: "Varlık" | "Borç" | "Gelir" | "Gider" | "Özkaynak";
  altTip: string; paraBirimi: Currency;
  bakiye: number; kullanımDurumu: "Aktif" | "Pasif";
  otomatik: boolean;
}

export interface YevmiyeFisi {
  id: string; firmaId: string; tarih: string; saat: string;
  belgeNo: string; aciklama: string;
  satir: YevmiyeSatir[];
  toplamTutar: number; paraBirimi: Currency;
  kdvMatrahi: number; kdvTutari: number;
  masrafMerkezi: string; projeId: string;
  durum: "Taslak" | "Onaylandı" | "İptal" | "Düzeltildi";
  olusturanId: string; olusturanAd: string;
  onayId: string; onayTarihi: string;
  ekler: string[];
}

export interface YevmiyeSatir {
  sira: number; hesapKod: string; hesapAd: string;
  borc: number; alacak: number;
  detay: string; projeId: string;
}

export interface BankaHesabi {
  id: string; firmaId: string; bankaAdi: string; subeAdi: string;
  hesapTuru: "TL" | "Döviz" | "Kredi"; hesapNo: string;
  iban: string; paraBirimi: Currency;
  bakiye: number; kullanilabilir: number;
  gunlukLimit: number; aylikLimit: number;
  durum: "Aktif" | "Pasif" | "Bloke";
  ekstreYuklemeGunu: number;
  bankaKodu: string; apiKey: string;
}

export interface BankaHareketi {
  id: string; firmaId: string; bankaHesabiId: string;
  tarih: string; islemTarihi: string; belgeNo: string;
  aciklama: string; tutar: number; paraBirimi: Currency;
  kur: number; tlKarsiligi: number;
  yon: "Gelen" | "Giden"; islemTip: string;
  karsiHesap: string; karsiIban: string;
  cariId: string; cariAd: string;
  muhasebeFisiId: string; durum: "Beklemede" | "Islendi" | "Reddedildi";
  aiOneri: AiOneri; label: string;
}

export interface KasaHesabi {
  id: string; firmaId: string; kasaAdi: string;
  paraBirimi: Currency; bakiye: number;
  yetkiliKullanicilar: string[];
  durum: "Aktif" | "Pasif";
}

export interface KasaHareketi {
  id: string; firmaId: string; kasaId: string;
  tarih: string; belgeNo: string; aciklama: string;
  tutar: number; paraBirimi: Currency;
  kur: number; tlKarsiligi: number;
  yon: "Giris" | "Cikis";
  cariId: string; cariAd: string;
  muhasebeFisiId: string;
  olusturanId: string;
}

export interface CariHesap {
  id: string; firmaId: string; kod: string;
  ad: string; tip: "Müşteri" | "Tedarikçi" | "Her İkisi";
  tcVergiNo: string; vergiDairesi: string;
  telefon: string; email: string; web: string;
  adres: string; il: string; ilce: string;
  yetkiliKisi: string; gorev: string;
  riskLimiti: number; riskSkoru: number;
  bolge: string; segman: string;
  bankaAdi: string; iban: string;
  vade: number; odemeGunu: number;
  toplamAlacak: number; toplamBorç: number; bakiye: number;
  yaslandirma: Yaslandirma[];
  durum: "Aktif" | "İzlemede" | "Riskli" | "Pasif";
  sonIletisim: string; sonIslem: string;
  notSayisi: number;
}

export interface Yaslandirma {
  aralik: string; tutar: number; gun: number;
}

export interface Fatura {
  id: string; firmaId: string; tip: "Satış" | "Alış";
  faturaNo: string; belgeNo: string;
  tarih: string; vadeTarihi: string;
  cariId: string; cariAd: string;
  satir: FaturaSatir[];
  aratoplam: number; kdvOrani: number; kdvTutari: number;
  digerVergiler: number; genelToplam: number;
  paraBirimi: Currency; kur: number; tlKarsiligi: number;
  irsaliyeNo: string; siparisNo: string;
  projeId: string; masrafMerkezi: string;
  durum: "Taslak" | "Onaylandı" | "Ödendi" | "Kısmi" | "Vade Geçmiş" | "İptal";
  odemeSekli: string; bankaHesabiId: string;
  kargoNo: string; kargoFirma: string;
  eFaturaDurumu: "Oluşturulmadı" | "Gönderildi" | "Onaylandı" | "Reddedildi";
  olusturanId: string; onayId: string;
}

export interface FaturaSatir {
  sira: number; urunKod: string; urunAd: string;
  miktar: number; birim: string; birimFiyat: number;
  kdvOrani: number; kdvTutari: number;
  iskontoOrani: number; iskontoTutari: number;
  satırToplam: number;
}

export interface Tahsilat {
  id: string; firmaId: string; tarih: string; belgeNo: string;
  cariId: string; cariAd: string;
  faturaId: string; faturaNo: string;
  tutar: number; paraBirimi: Currency;
  kur: number; tlKarsiligi: number;
  odemeSekli: "Nakit" | "Banka" | "Çek" | "Senet" | "Kredi Kartı" | "Virman";
  bankaHesabiId: string; kasaId: string;
  aciklama: string; durum: "Onaylandı" | "Beklemede" | "Iptal";
  olusturanId: string;
}

export interface Odeme {
  id: string; firmaId: string; tarih: string; belgeNo: string;
  cariId: string; cariAd: string;
  faturaId: string; faturaNo: string;
  tutar: number; paraBirimi: Currency;
  kur: number; tlKarsiligi: number;
  odemeSekli: string;
  bankaHesabiId: string; kasaId: string;
  aciklama: string; durum: "Onaylandı | Beklemede | Iptal";
  olusturanId: string;
}

// ═══════════════════════════════════════════════════════════════
// STOK & DEPO
// ═══════════════════════════════════════════════════════════════
export interface Depo {
  id: string; firmaId: string; kod: string; ad: string;
  adres: string; sorumluId: string;
  kapasite: number; doluluk: number;
  sıcaklıkKontrol: boolean; guvenlikSeviyesi: string;
  durum: "Aktif" | "Pasif";
}

export interface Urun {
  id: string; firmaId: string; kod: string; ad: string;
  kisaAd: string; barcode: string;
  kategori: string; altKategori: string;
  birim: string; eskiBirim: string; cevrimOrani: number;
  alisFiyati: number; satisFiyati: number;
  kdvOrani: number; oivOrani: number;
  minimumStok: number; maksimumStok: number;
  asgariSiparisMik: number;
  depoId: string; raf: string; lot: string; seriNo: string;
  agirlik: number; hacim: number;
  lotTakip: boolean; seriTakip: boolean;
  sonKullanma: boolean; kritik: boolean;
  maliyetYontemi: "FIFO" | "LIFO" | "ortalama";
  tedarikSuresi: number; garantiSuresi: number;
  toplamStok: number; rezerveStok: number; kullanilabilirStok: number;
  toplamDeger: number; durum: "Aktif" | "Pasif" | "Güncellenecek";
}

export interface StokHareketi {
  id: string; firmaId: string; tarih: string;
  urunId: string; urunKod: string; urunAd: string;
  depoId: string; depoAd: string;
  tip: "Giris" | "Cikis" | "Transfer" | "Sayim" | "Iade";
  miktar: number; birimFiyat: number; toplamTutar: number;
  birim: string;
  kaynakDepoId: string; kaynakDepoAd: string;
  hedefDepoId: string; hedefDepoAd: string;
  faturaId: string; irsaliyeId: string; siparisId: string;
  projeId: string; masrafMerkezi: string;
  aciklama: string; lotNo: string; seriNo: string;
  olusturanId: string;
}

export interface Barkod {
  id: string; firmaId: string; kod: string;
  urunId: string; tip: "EAN13" | "QR" | "CODE128" | "PDF417";
  deger: string; gorunum: string;
}

// ═══════════════════════════════════════════════════════════════
// CRM & SATIŞ
// ═══════════════════════════════════════════════════════════════
export interface CrmLead {
  id: string; firmaId: string; kod: string;
  tarih: string; ad: string; soyad: string; unvan: string;
  firma: string; sektor: string;
  telefon: string; email: string; web: string;
  adres: string; il: string;
  kaynak: string; kaynakDetay: string;
  asama: "Yeni" | "Nitelikli" | "Teklif" | "Müzakere" | "Kazandı" | "Kaybetti";
  deger: number; olasilik: number;
  sorumluId: string; sorumluAd: string;
  oncelik: "Düşük" | "Normal" | "Yüksek" | "Acil";
  sonGorisme: string; sonNot: string;
  kazanmaTarihi: string; kaybetmeNedeni: string;
  notlar: CrmNot[];
  gorevler: string[];
  etkinlikler: CrmEtkinlik[];
}

export interface CrmNot {
  id: string; leadId: string;
  yazarId: string; yazarAd: string;
  icerik: string; tur: "Not" | "Email" | "Arama" | "Toplantı" | "Demo";
  tarih: string; dosya: string[];
  okundu: boolean;
}

export interface CrmEtkinlik {
  id: string; leadId: string;
  tur: "Yoklama" | "Demo" | "Teklif" | "Sözleşme" | "Takip";
  tarih: string; saat: string;
  konu: string; yer: string;
  katilimcilar: string[];
  sonuc: string; hatirlatma: boolean;
}

export interface SatisTeklif {
  id: string; firmaId: string; teklifNo: string;
  tarih: string; gecerlilikTarihi: string;
  cariId: string; cariAd: string;
  sorumluId: string; sorumluAd: string;
  projeId: string;
  satir: FaturaSatir[];
  aratoplam: number; kdv: number; genelToplam: number;
  paraBirimi: Currency; kur: number; tlKarsiligi: number;
  durum: "Hazırlanıyor" | "Gönderildi" | "Onaylandı" | "Reddedildi" | "Siparis";
  not: string; kosullar: string;
  tekrarlanma: "Yok" | "Aylık" | "Çeyreklik" | "Yıllık";
}

export interface SatisSiparis {
  id: string; firmaId: string; siparisNo: string;
  teklifId: string; teklifNo: string;
  tarih: string; teslimatTarihi: string;
  cariId: string; cariAd: string;
  sorumluId: string; sorumluAd: string;
  depoId: string;
  satir: FaturaSatir[];
  aratoplam: number; kdv: number; genelToplam: number;
  iskontoOrani: number; iskontoTutar: number;
  paraBirimi: Currency;
  durum: "Beklemede" | "Onaylandı" | "Uretimde" | "Gonderildi" | "TeslimEdildi" | "Iptal";
  irsaliyeId: string; faturaId: string;
  sevkiyatAdresi: string; kargoFirma: string; kargoNo: string;
}

// ═══════════════════════════════════════════════════════════════
// SATIN ALMA
// ═══════════════════════════════════════════════════════════════
export interface SatinAlmaTalep {
  id: string; firmaId: string; talepNo: string;
  tarih: string; isteyenId: string; isteyenAd: string;
  departman: string; projeId: string;
  talepDetay: TalepSatir[];
  toplamTutar: number;
  onayDurumu: "Beklemede" | "Onaylandı" | "Reddedildi" | "Tamamlandı";
  onaylayanId: string; onayTarihi: string;
  not: string;
}

export interface TalepSatir {
  urunKod: string; urunAd: string;
  miktar: number; birim: string;
  tahminiBirimFiyat: number;
  toplamTutar: number; alternatifTedarikci: string;
}

export interface SatinAlmaSiparis {
  id: string; firmaId: string; siparisNo: string;
  talepId: string; tedarikciId: string; tedarikciAd: string;
  tarih: string; teslimatTarihi: string;
  satir: FaturaSatir[];
  aratoplam: number; kdv: number; genelToplam: number;
  paraBirimi: Currency;
  durum: "Beklemede" | "Kısmi" | "Tamamlandı" | "Iptal";
  irsaliyeler: string[]; faturaId: string;
  odemePlani: string; vade: number;
}

// ═══════════════════════════════════════════════════════════════
// PROJE YÖNETİMİ & ARGE
// ═══════════════════════════════════════════════════════════════
export interface Proje {
  id: string; firmaId: string; kod: string; ad: string;
  aciklama: string; tip: "Yazılım" | "İnşaat" | "Üretim" | "ARGE" | "Danışmanlık" | "Diğer";
  durum: "Planlı" | "Aktif" | "AskıyaAlındı" | "Tamamlandı" | "İptal";
  sorumluId: string; sorumluAd: string;
  baslangicTarihi: string; bitisTarihi: string;
  planlananSure: number; gecenSure: number;
  ilerleme: number; butceDurumu: ButceDurumu;
  maliyetler: ProjeMaliyet[];
  gelirler: ProjeGelir[];
  kazanc: ProjeKazanc;
  etiketler: string[];
  aktifGorev: number; tamamlananGorev: number;
  maliyetRaporu: MaliyetRaporu;
}

export interface ButceDurumu {
  planlanan: number; onaylanan: number;
  harcanan: number; kalan: number;
  kullanımOrani: number;
}

export interface ProjeMaliyet {
  id: string; projeId: string; tarih: string;
  kategori: string; altKategori: string;
  aciklama: string; tutar: number; paraBirimi: Currency;
  kur: number; tlKarsiligi: number;
  faturaId: string; fisId: string;
  masrafMerkezi: string; tedarikciId: string;
  onayDurumu: "Onaylandı" | "Beklemede";
}

export interface ProjeGelir {
  id: string; projeId: string; tarih: string;
  kategori: string; aciklama: string; tutar: number;
  faturaId: string; tahsilatId: string;
}

export interface ProjeKazanc {
  toplamGelir: number; toplamMaliyet: number;
  netKazanc: number; roi: number;
  karOrani: number; tahminiKarlilik: number;
}

export interface MaliyetRaporu {
  personel: number; malzeme: number; danismanlik: number;
  yazilim: number; donanim: number; diger: number;
  arge: number; kalite: number;
  toplam: number;
}

export interface Gorev {
  id: string; firmaId: string; projeId: string;
  baslik: string; aciklama: string;
  atananId: string; atananAd: string;
  olusturanId: string;
  oncelik: "Düşük" | "Normal" | "Yüksek" | "Kritik";
  durum: "Beklemede" | "DevamEdiyor" | "GözdenGecirme" | "Tamamlandı" | "Iptal";
  baslangic: string; bitis: string; gercekBitis: string;
  tahmin: number; gercek: number;
  altGorevler: AltGorev[];
  etiketler: string[];
  ilerleme: number;
}

export interface AltGorev {
  id: string; baslik: string; durum: "Beklemede" | "Tamamlandı"; atananId: string;
}

// ═══════════════════════════════════════════════════════════════
// İNSAN KAYNAKLARI
// ═══════════════════════════════════════════════════════════════
export interface Personel {
  id: string; firmaId: string; sicilNo: string;
  ad: string; soyad: string; tcNo: string;
  dogumTarihi: string; cinsiyet: string;
  medeniHal: string; askerlik: string;
  email: string; telefon: string; adres: string;
  departman: string; bolum: string; unvan: string;
  gorevBaslangic: string; oncekiIsyeri: string;
  maas: number; sosyalMaas: number; yemekUcreti: number;
  yolUcreti: number; primOrani: number;
  iban: string; banka: string;
  saglik: "Yok" | "Tam" | "Ek";
  yakinAd: string; yakinTelefon: string;
  izinGunu: number; kullanilanIzin: number; kalanIzin: number;
  toplamMesai: number; avans: number;
  ehliyet: string; ingilizce: string;
  durum: "Aktif" | "İzinli" | "Emekli" | "Ayrıldı";
}

export interface Izin {
  id: string; firmaId: string; personelId: string;
  tur: "Yıllık" | "Ücretsiz" | "Hastalık" | "Doğum" | "Babalık" | "Evlilik";
  baslangic: string; bitis: string; gun: number;
  durum: "Beklemede" | "Onaylandı" | "Reddedildi" | "İptal";
  onaylayanId: string; not: string;
}

export interface Mesai {
  id: string; firmaId: string; personelId: string;
  tarih: string; saat: string; tur: "Hafta İçi" | "Hafta Sonu" | "Bayram";
  normalSaat: number; fazlaSaat: number;
  tutar: number; durum: "Beklemede" | "Onaylandı" | "Reddedildi";
}

export interface Prim {
  id: string; firmaId: string; personelId: string;
  donem: string; satisTutari: number; primOrani: number;
  primTutari: number; durum: "Hesaplandı" | "Onaylandı" | "Ödendi";
}

export interface Avans {
  id: string; firmaId: string; personelId: string;
  tarih: string; tutar: number; sebep: string;
  taksit: number; kalanTaksit: number;
  durum: "Beklemede" | "Onaylandı | Kalan" | "Tamamlandı";
  maasKesintisi: number;
}

// ═══════════════════════════════════════════════════════════════
// EVRAK & DİJİTAL ARŞİV
// ═══════════════════════════════════════════════════════════════
export interface Evrak {
  id: string; firmaId: string; kod: string; ad: string;
  tur: "Sözleşme" | "Fatura" | "İrsaliye" | "Makbuz" | "Dilekçe" | "Rapor" | "Diğer";
  kategori: string; altKategori: string;
  dosyaYolu: string; thumbnail: string;
  boyut: number; sayfaSayisi: number;
  mimeType: string; hash: string;
  ilgiliTur: string; ilgiliId: string;
  cariId: string; projeId: string;
  olusturanId: string; olusturmaTarihi: string;
  gecerlilikBaslangic: string; gecerlilikBitis: string;
  etiketler: string[]; not: string;
  paylasim: "Ozel" | "Takım" | "Herkese";
}

// ═══════════════════════════════════════════════════════════════
// FİŞ OKUMA & OCR
// ═══════════════════════════════════════════════════════════════
export interface FisKayit {
  id: string; firmaId: string;
  gorselYolu: string; thumbnailYolu: string;
  tarih: string; saat: string;
  firmaAdi: string; vergiNo: string;
  toplam: number; kdv: number; matrah: number;
  paraBirimi: Currency; kur: number; tlKarsiligi: number;
  kategori: string; altKategori: string;
  aiKategori: string; aiGuven: number;
  ocrMetin: string; ocrSatirlar: string[];
  durum: "Beklemede" | "Islendi" | "Hatalı" | "Duzenlendi";
  muhasebeFisiId: string; giderId: string; projeId: string;
  bankaHareketId: string;
  olusturanId: string; olusturmaTarihi: string;
}

// ═══════════════════════════════════════════════════════════════
// AI SİSTEMİ
// ═══════════════════════════════════════════════════════════════
export interface AiOneri {
  kategori: string; guven: number; aciklama: string;
  kuralAcigi: string; oneri: string;
}

export interface AiAnaliz {
  id: string; firmaId: string; tur: string;
  tarih: string; sonuc: string; detay: string;
  data: Record<string,number | string>;
}

export interface AiGunlukOzet {
  id: string; firmaId: string; tarih: string;
  baslik: string; icerik: string;
  kritik: string[]; oneri: string[];
  hasalat: number; odeme: number; kasa: number; banka: number;
  riskliCariler: string[]; stokUyari: string[];
  gorevHatirlatma: string[];
}

// ═══════════════════════════════════════════════════════════════
// BOT SİSTEMİ
// ═══════════════════════════════════════════════════════════════
export interface BotMesaj {
  id: string; kullaniciId: string; yon: "gelen" | "giden";
  mesaj: string; tur: "metin" | "komut" | "dosya" | "gorsel";
  yanit: string; islem: string; tarih: string;
  basariili: boolean;
}

export interface BotKomut {
  komut: string; aciklama: string; ornek: string;
  kategori: "finans" | "cari" | "stok" | "proje" | "genel";
  yetki: RolTipi[];
}

// ═══════════════════════════════════════════════════════════════
// DOVİZ & KUR
// ═══════════════════════════════════════════════════════════════
export interface DovizKur {
  kod: Currency; ad: string; sembol: string;
  alis: number; satis: number; efektif: number;
  degisim: number; oncekiKapanis: number;
  yuksek: number; dusuk: number;
  hacim: number; saat: string;
}

export interface KurFarki {
  id: string; firmaId: string; tarih: string;
  kaynakDoviz: Currency; hedefDoviz: Currency;
  oncekiKur: number; yeniKur: number;
  fark: number; farkYuzdesi: number;
  toplamTutar: number; toplamKurFarki: number;
}

// ═══════════════════════════════════════════════════════════════
// YARDIMCI FONKSİYONLAR
// ═══════════════════════════════════════════════════════════════
export const paraFmt = (v: number, c: Currency = "TRY") =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 2 }).format(v);

export const sayiFmt = (v: number, decimals = 0) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: decimals }).format(v);

export const tarihFmt = (iso: string) =>
  new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));

export const tarihSaatFmt = (iso: string) =>
  new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

export const relativeTime = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.max(1, Math.round(diff / 60000));
  if (min < 60) return `${min} dk önce`;
  const hrs = Math.round(min / 60);
  if (hrs < 24) return `${hrs} sa önce`;
  return `${Math.round(hrs / 24)} gün önce`;
};

export const dovizCevir = (tutar: number, kaynak: Currency, hedef: Currency, kur: number = 1): number => {
  if (kaynak === hedef) return tutar;
  return tutar * kur;
};

export const filterByFirma = <T extends { firmaId?: string; platformId?: string }>(list: T[], id: string) =>
  list.filter(x => x.firmaId === id || x.platformId === id);

export const uid = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const rolePermissions: Record<RolTipi, ModulKey[]> = {
  SuperAdmin: ["dashboard","muhasebe","cari","banka","kasa","stok","satis","teklif","siparis","satinalma","fatura","tahsilat","odeme","crm","hr","gorev","takvim","proje","arge","evrak","urun","hizmet","rapor","ai","ayar","fisOkuma","botYonetimi"],
  FirmaAdmin: ["dashboard","muhasebe","cari","banka","kasa","stok","satis","teklif","siparis","satinalma","fatura","tahsilat","odeme","crm","hr","gorev","takvim","proje","arge","evrak","urun","hizmet","rapor","ai","ayar","fisOkuma"],
  Muhasebe: ["dashboard","muhasebe","cari","banka","kasa","fatura","tahsilat","odeme","rapor","fisOkuma","evrak"],
  Finans: ["dashboard","muhasebe","cari","banka","kasa","fatura","tahsilat","odeme","rapor","ai"],
  Satis: ["dashboard","cari","satis","teklif","siparis","crm","rapor","gorev","proje"],
  Operasyon: ["dashboard","stok","satinalma","siparis","gorev","takvim","proje","arge","urun"],
  Personel: ["dashboard","hr","gorev","takvim"],
  Görüntüleme: ["dashboard","rapor"],
};