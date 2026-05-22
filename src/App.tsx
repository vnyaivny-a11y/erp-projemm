import { useState, useEffect, useMemo, useCallback, type ReactNode } from "react";
import * as D from "./data";

// ═══════════════════════════════════════════════════════════════
// İKONLAR
// ═══════════════════════════════════════════════════════════════
const icons: Record<string, (c?: string)=>ReactNode> = {
  dashboard: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="4" rx="1.5"/><rect x="14" y="10" width="7" height="11" rx="1.5"/><rect x="3" y="13" width="7" height="8" rx="1.5"/></svg>,
  muhasebe: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h5"/></svg>,
  cari: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  banka: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/></svg>,
  kasa: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20M6 14h2M12 14h2"/></svg>,
  stok: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>,
  satis: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  crm: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  hr: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  gorev: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  proje: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  rapor: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  ai: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 2a4 4 0 014 4v1a1 1 0 001 1h1a4 4 0 010 8h-1a1 1 0 00-1 1v1a4 4 0 01-8 0v-1a1 1 0 00-1-1H6a4 4 0 010-8h1a1 1 0 001-1V6a4 4 0 014-4z"/><circle cx="12" cy="12" r="2"/></svg>,
  fis: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M3 9h2M19 9h2M3 15h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2"/></svg>,
  bot: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 2a2 2 0 012 2v1h2a3 3 0 013 3v1a3 3 0 01-3 3h-1v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1H6a3 3 0 01-3-3v-1a3 3 0 013-3h2V4a2 2 0 012-2z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>,
  fatura: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  arge: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
  ayar: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  search: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  bell: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
  menu: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  close: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M18 6L6 18M6 6l12 12"/></svg>,
  plus: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 5v14M5 12h14"/></svg>,
  check: (c="w-4 h-4")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M20 6L9 17l-5-5"/></svg>,
  warn: (c="w-5 h-5")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>,
  lock: (c="w-4 h-4")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  export: (c="w-4 h-4")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>,
  arrow: (c="w-4 h-4")=><svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>,
};

// ═══════════════════════════════════════════════════════════════
// SEED VERİLER
// ═══════════════════════════════════════════════════════════════
const platformUsers: D.PlatformKullanici[] = [
  { id:"pu1", email:"admin@mavera.com", sifre:"***", ad:"Mavera", soyad:"Admin", rol:"SuperAdmin", status:"Aktif", sonGiris:"2026-06-10T09:00:00Z", ipAdresleri:["192.168.1.1"] },
  { id:"pu2", email:"destek@mavera.com", sifre:"***", ad:"Destek", soyad:"Sistem", rol:"Destek", status:"Aktif", sonGiris:"2026-06-09T14:00:00Z", ipAdresleri:[] },
];

const firmalar: D.Firma[] = [
  { id:"f1", platformId:"pu1", ad:"Anadolu Holding", unvan:"Anadolu Holding A.Ş.", vergiNo:"1234567890", vergiDairesi:"Merkez", telefon:"0212 555 1234", adres:"İstanbul / Türkiye", sektor:"Üretim & Ticaret", tip:"kurumsal", logo:"", paraBirimi:"TRY", locale:"tr", moduller:["dashboard","muhasebe","cari","banka","kasa","stok","satis","teklif","siparis","satinalma","fatura","tahsilat","odeme","crm","hr","gorev","takvim","proje","arge","evrak","urun","rapor","ai","fisOkuma","botYonetimi"], kullaniciLimiti:50, diskLimitiMB:10000, paket:"Enterprise", status:"Aktif", olusturmaTarihi:"2025-01-01", sonGiris:"2026-06-10", planBitisTarihi:"2027-01-01" },
  { id:"f2", platformId:"pu1", ad:"Yıldız Teknoloji", unvan:"Yıldız Teknoloji Ltd. Şti.", vergiNo:"9876543210", vergiDairesi:"Kadıköy", telefon:"0216 777 3456", adres:"İstanbul / Türkiye", sektor:"Yazılım & IT", tip:"orta", logo:"", paraBirimi:"TRY", locale:"tr", moduller:["dashboard","muhasebe","cari","banka","kasa","stok","satis","teklif","siparis","fatura","tahsilat","crm","hr","gorev","proje","rapor","ai","fisOkuma"], kullaniciLimiti:20, diskLimitiMB:5000, paket:"Professional", status:"Aktif", olusturmaTarihi:"2025-06-15", sonGiris:"2026-06-10", planBitisTarihi:"2026-06-15" },
  { id:"f3", platformId:"pu1", ad:"Deniz İthalat", unvan:"Deniz İthalat İhracat A.Ş.", vergiNo:"5678901234", vergiDairesi:"Fatih", telefon:"0212 333 9876", adres:"İstanbul / Türkiye", sektor:"Dış Ticaret", tip:"orta", logo:"", paraBirimi:"USD", locale:"tr", moduller:["dashboard","muhasebe","cari","banka","kasa","stok","satis","teklif","satinalma","fatura","tahsilat","odeme","crm","hr","gorev","rapor","ai","fisOkuma"], kullaniciLimiti:15, diskLimitiMB:3000, paket:"Professional", status:"Aktif", olusturmaTarihi:"2025-09-01", sonGiris:"2026-06-09", planBitisTarihi:"2026-09-01" },
  { id:"f4", platformId:"pu1", ad:"Kişisel Finans", unvan:"Kişisel Kullanım", vergiNo:"-", vergiDairesi:"-", telefon:"0500 000 0000", adres:"Türkiye", sektor:"Kişisel", tip:"sahis", logo:"", paraBirimi:"TRY", locale:"tr", moduller:["dashboard","muhasebe","cari","banka","kasa","stok","satis","crm","hr","gorev","rapor","ai","fisOkuma"], kullaniciLimiti:3, diskLimitiMB:500, paket:"Starter", status:"Aktif", olusturmaTarihi:"2026-01-01", sonGiris:"2026-06-10", planBitisTarihi:"2027-01-01" },
];

const firmaKullanicilari: D.Kullanici[] = [
  { id:"u1", firmaId:"f1", email:"ahmet@anadolu.com", sifre:"***", ad:"Ahmet", soyad:"Yılmaz", avatar:"AY", rol:"SuperAdmin", departman:"Yönetim", unvan:"Genel Müdür", telefon:"0532 111 1111", dahili:"100", yetkiliModuller:D.rolePermissions.SuperAdmin, yetkiliSayfalar:[], twoFA:true, twoFASecret:"", status:"Aktif", sonGiris:"2026-06-10T09:15:00Z", girisSayisi:1245, sonIp:"192.168.1.45", sonTarayici:"Chrome 126", olusturmaTarihi:"2025-01-01" },
  { id:"u2", firmaId:"f1", email:"elif@anadolu.com", sifre:"***", ad:"Elif", soyad:"Kaya", avatar:"EK", rol:"Muhasebe", departman:"Finans", unvan:"Muhasebe Müdürü", telefon:"0532 222 2222", dahili:"200", yetkiliModuller:D.rolePermissions.Muhasebe, yetkiliSayfalar:[], twoFA:true, twoFASecret:"", status:"Aktif", sonGiris:"2026-06-10T08:30:00Z", girisSayisi:980, sonIp:"192.168.1.52", sonTarayici:"Firefox 126", olusturmaTarihi:"2025-02-01" },
  { id:"u3", firmaId:"f1", email:"can@anadolu.com", sifre:"***", ad:"Can", soyad:"Demir", avatar:"CD", rol:"Satis", departman:"Satış", unvan:"Satış Müdürü", telefon:"0532 333 3333", dahili:"300", yetkiliModuller:D.rolePermissions.Satis, yetkiliSayfalar:[], twoFA:false, twoFASecret:"", status:"Aktif", sonGiris:"2026-06-09T17:45:00Z", girisSayisi:756, sonIp:"192.168.1.78", sonTarayici:"Safari 17", olusturmaTarihi:"2025-03-01" },
  { id:"u4", firmaId:"f2", email:"selin@yildiz.com", sifre:"***", ad:"Selin", soyad:"Arslan", avatar:"SA", rol:"FirmaAdmin", departman:"Yönetim", unvan:"Genel Müdür", telefon:"0533 444 4444", dahili:"1", yetkiliModuller:D.rolePermissions.FirmaAdmin, yetkiliSayfalar:[], twoFA:true, twoFASecret:"", status:"Aktif", sonGiris:"2026-06-10T10:00:00Z", girisSayisi:567, sonIp:"10.0.0.15", sonTarayici:"Chrome 126", olusturmaTarihi:"2025-06-15" },
  { id:"u5", firmaId:"f2", email:"baris@yildiz.com", sifre:"***", ad:"Barış", soyad:"Çelik", avatar:"BÇ", rol:"Operasyon", departman:"Yazılım", unvan:"Kıdemli Geliştirici", telefon:"0533 555 5555", dahili:"2", yetkiliModuller:D.rolePermissions.Operasyon, yetkiliSayfalar:[], twoFA:false, twoFASecret:"", status:"Aktif", sonGiris:"2026-06-10T07:20:00Z", girisSayisi:432, sonIp:"10.0.0.22", sonTarayici:"Edge 126", olusturmaTarihi:"2025-07-01" },
  { id:"u6", firmaId:"f3", email:"meral@deniz.com", sifre:"***", ad:"Meral", soyad:"Öztürk", avatar:"MÖ", rol:"FirmaAdmin", departman:"Dış Ticaret", unvan:"Dış Ticaret Müdürü", telefon:"0534 666 6666", dahili:"1", yetkiliModuller:D.rolePermissions.FirmaAdmin, yetkiliSayfalar:[], twoFA:true, twoFASecret:"", status:"Aktif", sonGiris:"2026-06-10T09:50:00Z", girisSayisi:345, sonIp:"172.16.0.22", sonTarayici:"Chrome 126", olusturmaTarihi:"2025-09-01" },
  { id:"u7", firmaId:"f4", email:"zeynep@kisisel.com", sifre:"***", ad:"Zeynep", soyad:"Şahin", avatar:"ZŞ", rol:"FirmaAdmin", departman:"Kişisel", unvan:"Kullanıcı", telefon:"0500 000 0001", dahili:"", yetkiliModuller:D.rolePermissions.FirmaAdmin, yetkiliSayfalar:[], twoFA:false, twoFASecret:"", status:"Aktif", sonGiris:"2026-06-10T11:00:00Z", girisSayisi:89, sonIp:"127.0.0.1", sonTarayici:"Chrome 126", olusturmaTarihi:"2026-01-01" },
];

const auditLogs: D.AuditLog[] = [
  { id:"a1", kullaniciId:"u1", kullaniciAd:"Ahmet Yılmaz", firmaId:"f1", modul:"Muhasebe", islem:"Yevmiye fişi onaylandı", detay:"YF-2026-0847", ip:"192.168.1.45", tarayici:"Chrome 126", tarih:"2026-06-10T09:20:00Z" },
  { id:"a2", kullaniciId:"u3", kullaniciAd:"Can Demir", firmaId:"f1", modul:"Satış", islem:"Yeni teklif oluşturuldu", detay:"TEK-2026-0294", ip:"192.168.1.52", tarayici:"Firefox 126", tarih:"2026-06-10T10:05:00Z" },
  { id:"a3", kullaniciId:"u2", kullaniciAd:"Elif Kaya", firmaId:"f1", modul:"Finans", islem:"Tahsilat kaydı", detay:"₺485.000 - Atlas Tekstil", ip:"192.168.1.55", tarayici:"Chrome 126", tarih:"2026-06-10T08:45:00Z" },
  { id:"a4", kullaniciId:"u4", kullaniciAd:"Selin Arslan", firmaId:"f2", modul:"CRM", islem:"Yeni lead oluşturuldu", detay:"Polat Holding", ip:"10.0.0.15", tarayici:"Chrome 126", tarih:"2026-06-10T10:10:00Z" },
  { id:"a5", kullaniciId:"u6", kullaniciAd:"Meral Öztürk", firmaId:"f3", modul:"Finans", islem:"Döviz kuru güncellendi", detay:"USD 38.42", ip:"172.16.0.22", tarayici:"Chrome 126", tarih:"2026-06-10T09:55:00Z" },
];

const hesapPlani: D.HesapPlani[] = [
  { kod:"100", ad:"Kasa", tip:"Varlık", altTip:"Hazır Değerler", paraBirimi:"TRY", bakiye:425000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"101", ad:"Alınan Çekler", tip:"Varlık", altTip:"Hazır Değerler", paraBirimi:"TRY", bakiye:180000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"102", ad:"Bankalar", tip:"Varlık", altTip:"Hazır Değerler", paraBirimi:"TRY", bakiye:2850000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"120", ad:"Alıcılar", tip:"Varlık", altTip:"Ticari Alacaklar", paraBirimi:"TRY", bakiye:1640000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"153", ad:"Ticari Mallar", tip:"Varlık", altTip:"Stoklar", paraBirimi:"TRY", bakiye:980000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"255", ad:"Demirbaşlar", tip:"Varlık", altTip:"Sabit Kıymetler", paraBirimi:"TRY", bakiye:340000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"300", ad:"Banka Kredileri", tip:"Borç", altTip:"Finansal Borçlar", paraBirimi:"TRY", bakiye:750000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"320", ad:"Satıcılar", tip:"Borç", altTip:"Ticari Borçlar", paraBirimi:"TRY", bakiye:890000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"360", ad:"Ödenecek Vergiler", tip:"Borç", altTip:"Diğer Borçlar", paraBirimi:"TRY", bakiye:215000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"391", ad:"KDV Matrahı", tip:"Borç", altTip:"Kısa Vadeli Yükümlülükler", paraBirimi:"TRY", bakiye:0, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"500", ad:"Sermaye", tip:"Özkaynak", altTip:"Ödenmiş Sermaye", paraBirimi:"TRY", bakiye:2000000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"600", ad:"Yurt İçi Satışlar", tip:"Gelir", altTip:"Satış Gelirleri", paraBirimi:"TRY", bakiye:6840000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"601", ad:"Yurt Dışı Satışlar", tip:"Gelir", altTip:"Satış Gelirleri", paraBirimi:"TRY", bakiye:2150000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"620", ad:"Satılan Malın Maliyeti", tip:"Gider", altTip:"Satış Maliyetleri", paraBirimi:"TRY", bakiye:4120000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"632", ad:"Genel Yönetim Giderleri", tip:"Gider", altTip:"Faaliyet Giderleri", paraBirimi:"TRY", bakiye:980000, kullanımDurumu:"Aktif", otomatik:true },
  { kod:"780", ad:"Finansman Giderleri", tip:"Gider", altTip:"Diğer Giderler", paraBirimi:"TRY", bakiye:320000, kullanımDurumu:"Aktif", otomatik:true },
];

const yevmiyeFisleri: D.YevmiyeFisi[] = [
  { id:"y1", firmaId:"f1", tarih:"2026-06-10", saat:"09:15", belgeNo:"YF-2026-0847", aciklama:"Atlas Tekstil müşteri tahsilatı", satir:[{sira:1,hesapKod:"102",hesapAd:"Bankalar",borc:485000,alacak:0,detay:"",projeId:""},{sira:2,hesapKod:"120",hesapAd:"Alıcılar",borc:0,alacak:485000,detay:"",projeId:""}], toplamTutar:485000, paraBirimi:"TRY", kdvMatrahi:0, kdvTutari:0, masrafMerkezi:"Satış", projeId:"", durum:"Onaylandı", olusturanId:"u2", olusturanAd:"Elif Kaya", onayId:"u1", onayTarihi:"2026-06-10T09:18:00Z", ekler:[] },
  { id:"y2", firmaId:"f1", tarih:"2026-06-09", saat:"14:30", belgeNo:"YF-2026-0846", aciklama:"Ofis kira ödemesi - Haziran", satir:[{sira:1,hesapKod:"632",hesapAd:"Genel Yönetim Giderleri",borc:145000,alacak:0,detay:"Kira",projeId:""},{sira:2,hesapKod:"102",hesapAd:"Bankalar",borc:0,alacak:145000,detay:"",projeId:""}], toplamTutar:145000, paraBirimi:"TRY", kdvMatrahi:0, kdvTutari:0, masrafMerkezi:"Yönetim", projeId:"", durum:"Onaylandı", olusturanId:"u2", olusturanAd:"Elif Kaya", onayId:"u1", onayTarihi:"2026-06-09T14:45:00Z", ekler:[] },
  { id:"y3", firmaId:"f1", tarih:"2026-06-09", saat:"10:00", belgeNo:"YF-2026-0845", aciklama:"Hammadde alım faturası - Demir Çelik", satir:[{sira:1,hesapKod:"153",hesapAd:"Ticari Mallar",borc:620000,alacak:0,detay:"",projeId:""},{sira:2,hesapKod:"320",hesapAd:"Satıcılar",borc:0,alacak:620000,detay:"",projeId:""}], toplamTutar:620000, paraBirimi:"TRY", kdvMatrahi:516667, kdvTutari:103333, masrafMerkezi:"Üretim", projeId:"", durum:"Onaylandı", olusturanId:"u2", olusturanAd:"Elif Kaya", onayId:"u1", onayTarihi:"2026-06-09T10:30:00Z", ekler:[] },
  { id:"y4", firmaId:"f2", tarih:"2026-06-10", saat:"09:00", belgeNo:"YF-2026-0312", aciklama:"Yazılım lisans satışı tahsilatı", satir:[{sira:1,hesapKod:"102",hesapAd:"Bankalar",borc:380000,alacak:0,detay:"",projeId:""},{sira:2,hesapKod:"600",hesapAd:"Yurt İçi Satışlar",borc:0,alacak:380000,detay:"",projeId:""}], toplamTutar:380000, paraBirimi:"TRY", kdvMatrahi:316667, kdvTutari:63333, masrafMerkezi:"Satış", projeId:"", durum:"Onaylandı", olusturanId:"u4", olusturanAd:"Selin Arslan", onayId:"u4", onayTarihi:"2026-06-10T09:05:00Z", ekler:[] },
  { id:"y5", firmaId:"f3", tarih:"2026-06-10", saat:"11:00", belgeNo:"YF-2026-0089", aciklama:"USD ihracat bedeli tahsilatı", satir:[{sira:1,hesapKod:"102",hesapAd:"Bankalar",borc:125000,alacak:0,detay:"USD",projeId:""},{sira:2,hesapKod:"601",hesapAd:"Yurt Dışı Satışlar",borc:0,alacak:125000,detay:"",projeId:""}], toplamTutar:125000, paraBirimi:"USD", kdvMatrahi:0, kdvTutari:0, masrafMerkezi:"İhracat", projeId:"", durum:"Onaylandı", olusturanId:"u6", olusturanAd:"Meral Öztürk", onayId:"u6", onayTarihi:"2026-06-10T11:05:00Z", ekler:[] },
];

const bankaHesaplari: D.BankaHesabi[] = [
  { id:"b1", firmaId:"f1", bankaAdi:"Ziraat Bankası", subeAdi:"Merkez Şube", hesapTuru:"TL", hesapNo:"1234567-01", iban:"TR12 0001 0012 3456 7890 1234 56", paraBirimi:"TRY", bakiye:1850000, kullanilabilir:1820000, gunlukLimit:500000, aylikLimit:5000000, durum:"Aktif", ekstreYuklemeGunu:1, bankaKodu:"ziraat", apiKey:"" },
  { id:"b2", firmaId:"f1", bankaAdi:"Garanti BBVA", subeAdi:"Ticari Şube", hesapTuru:"TL", hesapNo:"9876543-01", iban:"TR98 0006 2009 8765 4321 0000 01", paraBirimi:"TRY", bakiye:720000, kullanilabilir:720000, gunlukLimit:200000, aylikLimit:2000000, durum:"Aktif", ekstreYuklemeGunu:5, bankaKodu:"garanti", apiKey:"" },
  { id:"b3", firmaId:"f1", bankaAdi:"İş Bankası", subeAdi:"Döviz Şubesi", hesapTuru:"Döviz", hesapNo:"5555555-01", iban:"TR55 0006 4005 5555 5500 0000 01", paraBirimi:"USD", bakiye:45200, kullanilabilir:45200, gunlukLimit:100000, aylikLimit:1000000, durum:"Aktif", ekstreYuklemeGunu:10, bankaKodu:"is", apiKey:"" },
  { id:"b4", firmaId:"f2", bankaAdi:"Yapı Kredi", subeAdi:"Teknoloji OSB", hesapTuru:"TL", hesapNo:"3333333-01", iban:"TR33 0006 7003 3333 3300 0000 01", paraBirimi:"TRY", bakiye:890000, kullanilabilir:890000, gunlukLimit:300000, aylikLimit:2000000, durum:"Aktif", ekstreYuklemeGunu:3, bankaKodu:"yk", apiKey:"" },
  { id:"b5", firmaId:"f3", bankaAdi:"Akbank", subeAdi:"Dış Ticaret", hesapTuru:"Döviz", hesapNo:"7777777-01", iban:"TR77 0004 6007 7777 7700 0000 01", paraBirimi:"USD", bakiye:124500, kullanilabilir:124500, gunlukLimit:200000, aylikLimit:2000000, durum:"Aktif", ekstreYuklemeGunu:7, bankaKodu:"akbank", apiKey:"" },
  { id:"b6", firmaId:"f3", bankaAdi:"TEB", subeAdi:"EUR Hesap", hesapTuru:"Döviz", hesapNo:"8888888-01", iban:"TR88 0003 2008 8888 8800 0000 01", paraBirimi:"EUR", bakiye:38200, kullanilabilir:38200, gunlukLimit:100000, aylikLimit:1000000, durum:"Aktif", ekstreYuklemeGunu:15, bankaKodu:"teb", apiKey:"" },
];

const kasaHesaplari: D.KasaHesabi[] = [
  { id:"k1", firmaId:"f1", kasaAdi:"TL Kasası", paraBirimi:"TRY", bakiye:285000, yetkiliKullanicilar:["u1","u2"], durum:"Aktif" },
  { id:"k2", firmaId:"f1", kasaAdi:"USD Kasası", paraBirimi:"USD", bakiye:12400, yetkiliKullanicilar:["u2"], durum:"Aktif" },
  { id:"k3", firmaId:"f1", kasaAdi:"EUR Kasası", paraBirimi:"EUR", bakiye:8900, yetkiliKullanicilar:["u2"], durum:"Aktif" },
  { id:"k4", firmaId:"f2", kasaAdi:"Ana Kasa", paraBirimi:"TRY", bakiye:42000, yetkiliKullanicilar:["u4"], durum:"Aktif" },
  { id:"k5", firmaId:"f3", kasaAdi:"USD Kasa", paraBirimi:"USD", bakiye:8500, yetkiliKullanicilar:["u6"], durum:"Aktif" },
];

const cariHesaplar: D.CariHesap[] = [
  { id:"c1", firmaId:"f1", kod:"C-001", ad:"Atlas Tekstil A.Ş.", tip:"Müşteri", tcVergiNo:"1112223334", vergiDairesi:"Merkez", telefon:"0212 555 1234", email:"info@atlas.com", web:"www.atlas.com", adres:"İstanbul", il:"İstanbul", ilce:"Fatih", yetkiliKisi:"Mehmet Öz", gorev:"Satın Alma Müdürü", riskLimiti:2000000, riskSkoru:82, bolge:"Marmara", segman:"A+", bankaAdi:"Ziraat Bankası", iban:"TR12 0001 0012 3456", vade:30, odemeGunu:30, toplamAlacak:685000, toplamBorç:0, bakiye:685000, yaslandirma:[{aralik:"0-30",tutar:280000,gun:15},{aralik:"31-60",tutar:195000,gun:45},{aralik:"61-90",tutar:130000,gun:75},{aralik:"90+",tutar:80000,gun:120}], durum:"Aktif", sonIletisim:"2026-06-08", sonIslem:"2026-06-10", notSayisi:12 },
  { id:"c2", firmaId:"f1", kod:"T-001", ad:"Demir Çelik San.", tip:"Tedarikçi", tcVergiNo:"4445556667", vergiDairesi:"Sanayi", telefon:"0216 444 5678", email:"info@demircelik.com", web:"www.demircelik.com", adres:"Bursa", il:"Bursa", ilce:"Organize", yetkiliKisi:"Ahmet Demir", gorev:"Satış Müdürü", riskLimiti:1500000, riskSkoru:75, bolge:"Marmara", segman:"A", bankaAdi:"Garanti", iban:"TR98 0006 2009", vade:45, odemeGunu:45, toplamAlacak:0, toplamBorç:420000, bakiye:-420000, yaslandirma:[{aralik:"0-30",tutar:220000,gun:20},{aralik:"31-60",tutar:120000,gun:50},{aralik:"61-90",tutar:55000,gun:70},{aralik:"90+",tutar:25000,gun:100}], durum:"Aktif", sonIletisim:"2026-06-05", sonIslem:"2026-06-08", notSayisi:5 },
  { id:"c3", firmaId:"f1", kod:"C-002", ad:"Mavi Kimya Ltd.", tip:"Müşteri", tcVergiNo:"7778889990", vergiDairesi:"Kadıköy", telefon:"0312 333 9876", email:"satis@mavikimya.com", web:"www.mavikimya.com", adres:"Ankara", il:"Ankara", ilce:"Çankaya", yetkiliKisi:"Ayşe Mavi", gorev:"Genel Müdür", riskLimiti:800000, riskSkoru:65, bolge:"İç Anadolu", segman:"B+", bankaAdi:"İş Bankası", iban:"TR55 0006 4005", vade:30, odemeGunu:30, toplamAlacak:520000, toplamBorç:0, bakiye:520000, yaslandirma:[{aralik:"0-30",tutar:210000,gun:18},{aralik:"31-60",tutar:160000,gun:48},{aralik:"61-90",tutar:95000,gun:75},{aralik:"90+",tutar:55000,gun:110}], durum:"İzlemede", sonIletisim:"2026-06-06", sonIslem:"2026-06-07", notSayisi:8 },
  { id:"c4", firmaId:"f2", kod:"C-003", ad:"Mega Yazılım", tip:"Müşteri", tcVergiNo:"6667778889", vergiDairesi:"Kadıköy", telefon:"0216 777 3456", email:"info@mega.com", web:"www.mega.com", adres:"İstanbul", il:"İstanbul", ilce:"Kadıköy", yetkiliKisi:"Deniz Polat", gorev:"IT Direktörü", riskLimiti:500000, riskSkoru:88, bolge:"Marmara", segman:"A+", bankaAdi:"Yapı Kredi", iban:"TR33 0006 7003", vade:15, odemeGunu:15, toplamAlacak:245000, toplamBorç:0, bakiye:245000, yaslandirma:[{aralik:"0-30",tutar:145000,gun:10},{aralik:"31-60",tutar:60000,gun:35},{aralik:"61-90",tutar:25000,gun:65},{aralik:"90+",tutar:15000,gun:95}], durum:"Aktif", sonIletisim:"2026-06-09", sonIslem:"2026-06-10", notSayisi:15 },
  { id:"c5", firmaId:"f3", kod:"C-004", ad:"Global Trading Co.", tip:"Müşteri", tcVergiNo:"AE-123456", vergiDairesi:"Dubai", telefon:"+971 4 555 1234", email:"info@global.ae", web:"www.global.ae", adres:"Dubai", il:"Dubai", ilce:"Trade Center", yetkiliKisi:"Ali Hassan", gorev:"Procurement Manager", riskLimiti:500000, riskSkoru:90, bolge:"UAE", segman:"A+", bankaAdi:"Akbank", iban:"TR77 0004 6007", vade:60, odemeGunu:60, toplamAlacak:182000, toplamBorç:0, bakiye:182000, yaslandirma:[{aralik:"0-30",tutar:95000,gun:25},{aralik:"31-60",tutar:52000,gun:45},{aralik:"61-90",tutar:20000,gun:70},{aralik:"90+",tutar:15000,gun:100}], durum:"Aktif", sonIletisim:"2026-06-07", sonIslem:"2026-06-08", notSayisi:7 },
];

const faturalar: D.Fatura[] = [
  { id:"ft1", firmaId:"f1", tip:"Satış", faturaNo:"FAT-2026-1847", belgeNo:"", tarih:"2026-06-08", vadeTarihi:"2026-06-28", cariId:"c1", cariAd:"Atlas Tekstil A.Ş.", satir:[{sira:1,urunKod:"UR-001",urunAd:"Endüstriyel Rulman 6205",miktar:500,birim:"Adet",birimFiyat:185,kdvOrani:20,kdvTutari:18500,iskontoOrani:0,iskontoTutari:0,satırToplam:111000},{sira:2,urunKod:"UR-002",urunAd:"Hidrolik Pompa HP-200",miktar:50,birim:"Adet",birimFiyat:6800,kdvOrani:20,kdvTutari:68000,iskontoOrani:5,iskontoTutari:17000,satırToplam:323000}], aratoplam:434000, kdvOrani:20, kdvTutari:87000, digerVergiler:0, genelToplam:485000, paraBirimi:"TRY", kur:1, tlKarsiligi:485000, irsaliyeNo:"", siparisNo:"SIP-2026-0155", projeId:"", masrafMerkezi:"Satış", durum:"Ödendi", odemeSekli:"Banka", bankaHesabiId:"b1", kargoNo:"", kargoFirma:"", eFaturaDurumu:"Onaylandı", olusturanId:"u3", onayId:"u1" },
  { id:"ft2", firmaId:"f1", tip:"Satış", faturaNo:"FAT-2026-1848", belgeNo:"", tarih:"2026-06-10", vadeTarihi:"2026-07-10", cariId:"c3", cariAd:"Mavi Kimya Ltd.", satir:[{sira:1,urunKod:"UR-003",urunAd:"Paslanmaz Çelik Boru DN50",miktar:200,birim:"Metre",birimFiyat:520,kdvOrani:20,kdvTutari:20800,iskontoOrani:0,iskontoTutari:0,satırToplam:124800}], aratoplam:104000, kdvOrani:20, kdvTutari:20800, digerVergiler:0, genelToplam:124800, paraBirimi:"TRY", kur:1, tlKarsiligi:124800, irsaliyeNo:"", siparisNo:"", projeId:"", masrafMerkezi:"Satış", durum:"Kısmi", odemeSekli:"Çek", bankaHesabiId:"", kargoNo:"", kargoFirma:"", eFaturaDurumu:"Gönderildi", olusturanId:"u3", onayId:"u1" },
];

const urunler: D.Urun[] = [
  { id:"p1", firmaId:"f1", kod:"UR-001", ad:"Endüstriyel Rulman 6205", kisaAd:"Rulman 6205", barcode:"8690001001001", kategori:"Endüstriyel", altKategori:"Rulmanlar", birim:"Adet", eskiBirim:"", cevrimOrani:1, alisFiyati:120, satisFiyati:185, kdvOrani:20, oivOrani:0, minimumStok:500, maksimumStok:5000, asgariSiparisMik:100, depoId:"d1", raf:"A-01-01", lot:"", seriNo:"", agirlik:0.15, hacim:0, lotTakip:true, seriTakip:false, sonKullanma:false, kritik:false, maliyetYontemi:"FIFO", tedarikSuresi:14, garantiSuresi:24, toplamStok:2400, rezerveStok:50, kullanilabilirStok:2350, toplamDeger:288000, durum:"Aktif" },
  { id:"p2", firmaId:"f1", kod:"UR-002", ad:"Hidrolik Pompa HP-200", kisaAd:"HP-200 Pompa", barcode:"8690001001002", kategori:"Makine", altKategori:"Hidrolik", birim:"Adet", eskiBirim:"", cevrimOrani:1, alisFiyati:4500, satisFiyati:6800, kdvOrani:20, oivOrani:0, minimumStok:20, maksimumStok:200, asgariSiparisMik:5, depoId:"d1", raf:"B-02-05", lot:"", seriNo:"", agirlik:12, hacim:0, lotTakip:true, seriTakip:true, sonKullanma:false, kritik:true, maliyetYontemi:"FIFO", tedarikSuresi:21, garantiSuresi:36, toplamStok:85, rezerveStok:10, kullanilabilirStok:75, toplamDeger:382500, durum:"Aktif" },
  { id:"p3", firmaId:"f1", kod:"UR-003", ad:"Paslanmaz Çelik Boru DN50", kisaAd:"Çelik Boru DN50", barcode:"8690001001003", kategori:"Ham madde", altKategori:"Çelik", birim:"Metre", eskiBirim:"Adet", cevrimOrani:1, alisFiyati:380, satisFiyati:520, kdvOrani:20, oivOrani:0, minimumStok:300, maksimumStok:5000, asgariSiparisMik:50, depoId:"d2", raf:"C-01-10", lot:"", seriNo:"", agirlik:3.5, hacim:0, lotTakip:false, seriTakip:false, sonKullanma:false, kritik:false, maliyetYontemi:"FIFO", tedarikSuresi:10, garantiSuresi:0, toplamStok:1200, rezerveStok:0, kullanilabilirStok:1200, toplamDeger:456000, durum:"Aktif" },
  { id:"p4", firmaId:"f1", kod:"UR-004", ad:"Elektrik Motoru 5.5kW", kisaAd:"EM 5.5kW", barcode:"8690001001004", kategori:"Makine", altKategori:"Elektrik", birim:"Adet", eskiBirim:"", cevrimOrani:1, alisFiyati:12000, satisFiyati:18500, kdvOrani:20, oivOrani:0, minimumStok:15, maksimumStok:100, asgariSiparisMik:2, depoId:"d1", raf:"B-03-02", lot:"", seriNo:"", agirlik:35, hacim:0, lotTakip:true, seriTakip:true, sonKullanma:false, kritik:true, maliyetYontemi:"FIFO", tedarikSuresi:28, garantiSuresi:48, toplamStok:12, rezerveStok:0, kullanilabilirStok:12, toplamDeger:144000, durum:"Aktif" },
  { id:"p5", firmaId:"f2", kod:"YZ-001", ad:"ERP Lisans - Enterprise", kisaAd:"ERP Enterprise", barcode:"YZ001ENT", kategori:"Yazılım", altKategori:"Lisans", birim:"Lisans", eskiBirim:"", cevrimOrani:1, alisFiyati:0, satisFiyati:95000, kdvOrani:20, oivOrani:0, minimumStok:1, maksimumStok:999, asgariSiparisMik:1, depoId:"", raf:"", lot:"", seriNo:"", agirlik:0, hacim:0, lotTakip:false, seriTakip:true, sonKullanma:false, kritik:false, maliyetYontemi:"FIFO", tedarikSuresi:0, garantiSuresi:12, toplamStok:999, rezerveStok:0, kullanilabilirStok:999, toplamDeger:0, durum:"Aktif" },
];

const crmLeadler: D.CrmLead[] = [
  { id:"l1", firmaId:"f1", kod:"L-001", tarih:"2026-06-01", ad:"Serkan", soyad:"Koç", unvan:"Satın Alma Direktörü", firma:"Koç Endüstri A.Ş.", sektor:"Otomotiv", telefon:"0532 999 1111", email:"serkan@koc.com", web:"www.koc.com", adres:"İstanbul", il:"İstanbul", kaynak:"Web Formu", kaynakDetay:"ana sayfa", asama:"Teklif", deger:1250000, olasilik:75, sorumluId:"u3", sorumluAd:"Can Demir", oncelik:"Yüksek", sonGorisme:"2026-06-10", sonNot:"Büyük çaplı üretim teklifi bekleniyor", kazanmaTarihi:"", kaybetmeNedeni:"", notlar:[], gorevler:[], etkinlikler:[] },
  { id:"l2", firmaId:"f1", kod:"L-002", tarih:"2026-05-28", ad:"Ayşe", soyad:"Şen", unvan:"Genel Müdür", firma:"Şen Makine Ltd.", sektor:"Makine", telefon:"0532 888 2222", email:"ayse@sen.com", web:"www.sen.com", adres:"Ankara", il:"Ankara", kaynak:"Referans", kaynakDetay:"Mevcut müşteri", asama:"Nitelikli", deger:680000, olasilik:60, sorumluId:"u3", sorumluAd:"Can Demir", oncelik:"Normal", sonGorisme:"2026-06-09", sonNot:"Demo toplantısı planlanacak", kazanmaTarihi:"", kaybetmeNedeni:"", notlar:[], gorevler:[], etkinlikler:[] },
  { id:"l3", firmaId:"f1", kod:"L-003", tarih:"2026-06-05", ad:"Berk", soyad:"Tan", unvan:"IT Müdürü", firma:"Tan Otomotiv", sektor:"Otomotiv", telefon:"0532 777 3333", email:"berk@tan.com", web:"www.tan.com", adres:"Bursa", il:"Bursa", kaynak:"Fuar", kaynakDetay:"MAKTEK 2026", asama:"Yeni", deger:420000, olasilik:30, sorumluId:"u3", sorumluAd:"Can Demir", oncelik:"Düşük", sonGorisme:"2026-06-08", sonNot:"Fuarda tanıştık, katalog gönderildi", kazanmaTarihi:"", kaybetmeNedeni:"", notlar:[], gorevler:[], etkinlikler:[] },
  { id:"l4", firmaId:"f2", kod:"L-004", tarih:"2026-06-08", ad:"Deniz", soyad:"Polat", unvan:"Genel Müdür", firma:"Polat Holding", sektor:"Holding", telefon:"0533 666 4444", email:"deniz@polat.com", web:"www.polat.com", adres:"İstanbul", il:"İstanbul", kaynak:"LinkedIn", kaynakDetay:"Reklam", asama:"Müzakere", deger:950000, olasilik:85, sorumluId:"u4", sorumluAd:"Selin Arslan", oncelik:"Acil", sonGorisme:"2026-06-10", sonNot:"Enterprise ERP teklifi müzakere aşamasında", kazanmaTarihi:"", kaybetmeNedeni:"", notlar:[], gorevler:[], etkinlikler:[] },
  { id:"l5", firmaId:"f3", kod:"L-005", tarih:"2026-06-03", ad:"Ali", soyad:"Hassan", unvan:"Procurement Manager", firma:"Al Noor Trading", sektor:"Ticaret", telefon:"+971 50 555 6666", email:"ali@alnoor.ae", web:"www.alnoor.ae", adres:"Dubai", il:"Dubai", kaynak:"B2B Portal", kaynakDetay:"Global Sources", asama:"Nitelikli", deger:520000, olasilik:65, sorumluId:"u6", sorumluAd:"Meral Öztürk", oncelik:"Yüksek", sonGorisme:"2026-06-09", sonNot:"Elektronik komponent toptan alım", kazanmaTarihi:"", kaybetmeNedeni:"", notlar:[], gorevler:[], etkinlikler:[] },
];

const projeler: D.Proje[] = [
  { id:"pr1", firmaId:"f1", kod:"PRJ-001", ad:"Otomotiv Sektörü Tedarik Projesi", aciklama:"Yeni nesil otomotiv parçası üretim projesi", tip:"Üretim", durum:"Aktif", sorumluId:"u1", sorumluAd:"Ahmet Yılmaz", baslangicTarihi:"2026-01-15", bitisTarihi:"2026-12-31", planlananSure:350, gecenSure:147, ilerleme:42, butceDurumu:{planlanan:2500000, onaylanan:2800000, harcanan:1176000, kalan:1324000, kullanımOrani:42}, maliyetler:[{id:"mc1",projeId:"pr1",tarih:"2026-05-01",kategori:"Malzeme",altKategori:"Hammadde",aciklama:"Çelik sac alımı",tutar:420000,paraBirimi:"TRY",kur:1,tlKarsiligi:420000,faturaId:"ft1",fisId:"y3",masrafMerkezi:"Üretim",tedarikciId:"c2",onayDurumu:"Onaylandı"},{id:"mc2",projeId:"pr1",tarih:"2026-05-15",kategori:"Personel",altKategori:"Ücret",aciklama:"Üretim personeli maaşları",tutar:380000,paraBirimi:"TRY",kur:1,tlKarsiligi:380000,faturaId:"",fisId:"",masrafMerkezi:"Üretim",tedarikciId:"",onayDurumu:"Onaylandı"}], gelirler:[{id:"gr1",projeId:"pr1",tarih:"2026-04-30",kategori:"Satış",aciklama:"Ara teslimat",tutar:850000,faturaId:"ft1",tahsilatId:""}], kazanc:{toplamGelir:850000,toplamMaliyet:800000,netKazanc:50000,roi:6.25,karOrani:5.9,tahminiKarlilik:15}, etiketler:["otomotiv","üretim","ihracat"], aktifGorev:8, tamamlananGorev:12, maliyetRaporu:{personel:380000,malzeme:420000,danismanlik:0,yazilim:0,donanim:156000,diger:120000,arge:0,kalite:100000,toplam:1176000} },
  { id:"pr2", firmaId:"f2", kod:"PRJ-002", ad:"ERP v4.0 Geliştirme", aciklama:"Yeni nesil ERP sistemi geliştirme projesi", tip:"Yazılım", durum:"Aktif", sorumluId:"u4", sorumluAd:"Selin Arslan", baslangicTarihi:"2026-03-01", bitisTarihi:"2026-09-30", planlananSure:210, gecenSure:102, ilerleme:48, butceDurumu:{planlanan:1800000, onaylanan:1950000, harcanan:936000, kalan:1014000, kullanımOrani:48}, maliyetler:[], gelirler:[], kazanc:{toplamGelir:0,toplamMaliyet:936000,netKazanc:-936000,roi:-48,karOrani:-100,tahminiKarlilik:25}, etiketler:["yazılım","erp","cloud"], aktifGorev:15, tamamlananGorev:18, maliyetRaporu:{personel:720000,malzeme:0,danismanlik:50000,yazilim:120000,donanim:46000,diger:0,arge:0,kalite:0,toplam:936000} },
  { id:"pr3", firmaId:"f1", kod:"PRJ-003", ad:"ARGE - Yeni Ürün Geliştirme", aciklama:"Yeni nesil hibrit motor prototip geliştirme", tip:"ARGE", durum:"Aktif", sorumluId:"u1", sorumluAd:"Ahmet Yılmaz", baslangicTarihi:"2026-04-01", bitisTarihi:"2027-03-31", planlananSure:365, gecenSure:71, ilerleme:19, butceDurumu:{planlanan:5000000, onaylanan:5500000, harcanan:1045000, kalan:4455000, kullanımOrani:19}, maliyetler:[], gelirler:[], kazanc:{toplamGelir:0,toplamMaliyet:1045000,netKazanc:-1045000,roi:-19,karOrani:-100,tahminiKarlilik:35}, etiketler:["arge","prototip","yenilik"], aktifGorev:6, tamamlananGorev:3, maliyetRaporu:{personel:450000,malzeme:280000,danismanlik:150000,yazilim:0,donanim:95000,diger:70000,arge:1045000,kalite:0,toplam:1045000} },
];

const gorevler: D.Gorev[] = [
  { id:"g1", firmaId:"f1", projeId:"pr1", baslik:"Atlas Tekstil teklifi hazırla", aciklama:"Yeni sezon için 5 kalem ürün teklifi", atananId:"u3", atananAd:"Can Demir", olusturanId:"u1", oncelik:"Yüksek", durum:"DevamEdiyor", baslangic:"2026-06-08", bitis:"2026-06-12", gercekBitis:"", tahmin:4, gercek:2, altGorevler:[], etiketler:["teklif","aciliyet"], ilerleme:50 },
  { id:"g2", firmaId:"f1", projeId:"pr1", baslik:"Haziran KDV beyannamesi", aciklama:"KDV-1 beyannamesi hazırlanacak", atananId:"u2", atananAd:"Elif Kaya", olusturanId:"u1", oncelik:"Kritik", durum:"Beklemede", baslangic:"2026-06-10", bitis:"2026-06-20", gercekBitis:"", tahmin:2, gercek:0, altGorevler:[], etiketler:["muhasebe","kdv"], ilerleme:0 },
  { id:"g3", firmaId:"f1", projeId:"pr1", baslik:"Depo sayımı - Q2", aciklama:"Çeyreklik stoğun kontrolü", atananId:"u5", atananAd:"Emre Yıldız", olusturanId:"u1", oncelik:"Normal", durum:"Beklemede", baslangic:"2026-06-15", bitis:"2026-06-18", gercekBitis:"", tahmin:3, gercek:0, altGorevler:[{id:"sg1",baslik:"Ana depo kontrol",durum:"Beklemede",atananId:"u5"},{id:"sg2",baslik:"Hammadde depo kontrol",durum:"Beklemede",atananId:"u5"}], etiketler:["depo","envanter"], ilerleme:0 },
  { id:"g4", firmaId:"f2", projeId:"pr2", baslik:"v3.0 sürüm yayını", aciklama:"Yeni ERP modülü production'a alınacak", atananId:"u5", atananAd:"Barış Çelik", olusturanId:"u4", oncelik:"Kritik", durum:"DevamEdiyor", baslangic:"2026-06-05", bitis:"2026-06-14", gercekBitis:"", tahmin:8, gercek:5, altGorevler:[], etiketler:["yazılım","deploy"], ilerleme:62 },
  { id:"g5", firmaId:"f1", projeId:"pr1", baslik:"Müşteri ziyareti - Koç Endüstri", aciklama:"Teklif sunumu ve sözleşme müzakeresi", atananId:"u3", atananAd:"Can Demir", olusturanId:"u1", oncelik:"Yüksek", durum:"Beklemede", baslangic:"2026-06-12", bitis:"2026-06-12", gercekBitis:"", tahmin:1, gercek:0, altGorevler:[], etiketler:["crm","satış"], ilerleme:0 },
];

const personeller: D.Personel[] = [
  { id:"pe1", firmaId:"f1", sicilNo:"S-001", ad:"Ahmet", soyad:"Yılmaz", tcNo:"11111111111", dogumTarihi:"1978-03-15", cinsiyet:"Erkek", medeniHal:"Evli", askerlik:"Yapıldı", email:"ahmet@anadolu.com", telefon:"0532 111 1111", adres:"İstanbul", departman:"Yönetim", bolum:"Genel Müdürlük", unvan:"Genel Müdür", gorevBaslangic:"2015-03-01", oncekiIsyeri:"XYZ Holding", maas:185000, sosyalMaas:25000, yemekUcreti:3500, yolUcreti:2000, primOrani:0, iban:"TR12 0001 0012", banka:"Ziraat Bankası", saglik:"Tam", yakinAd:"Fatma Yılmaz", yakinTelefon:"0532 111 2222", ehliyet:"B", ingilizce:"İyi", izinGunu:24, kullanilanIzin:6, kalanIzin:18, toplamMesai:0, avans:0, durum:"Aktif" },
  { id:"pe2", firmaId:"f1", sicilNo:"S-002", ad:"Elif", soyad:"Kaya", tcNo:"22222222222", dogumTarihi:"1985-07-22", cinsiyet:"Kadın", medeniHal:"Bekar", askerlik:"---", email:"elif@anadolu.com", telefon:"0532 222 2222", adres:"İstanbul", departman:"Finans", bolum:"Muhasebe", unvan:"Muhasebe Müdürü", gorevBaslangic:"2018-06-15", oncekiIsyeri:"ABC Şirketi", maas:125000, sosyalMaas:18000, yemekUcreti:3500, yolUcreti:2000, primOrani:0, iban:"TR98 0006 2009", banka:"Garanti BBVA", saglik:"Tam", yakinAd:"", yakinTelefon:"", ehliyet:"B", ingilizce:"Orta", izinGunu:18, kullanilanIzin:4, kalanIzin:14, toplamMesai:8, avans:0, durum:"Aktif" },
  { id:"pe3", firmaId:"f1", sicilNo:"S-003", ad:"Can", soyad:"Demir", tcNo:"33333333333", dogumTarihi:"1990-11-08", cinsiyet:"Erkek", medeniHal:"Bekar", askerlik:"Yapıldı", email:"can@anadolu.com", telefon:"0532 333 3333", adres:"İstanbul", departman:"Satış", bolum:"Satış", unvan:"Satış Müdürü", gorevBaslangic:"2019-01-10", oncekiIsyeri:"", maas:110000, sosyalMaas:15000, yemekUcreti:3500, yolUcreti:2000, primOrani:5, iban:"TR55 0006 4005", banka:"İş Bankası", saglik:"Tam", yakinAd:"", yakinTelefon:"", ehliyet:"B", ingilizce:"İyi", izinGunu:14, kullanilanIzin:2, kalanIzin:12, toplamMesai:12, avans:15000, durum:"Aktif" },
  { id:"pe4", firmaId:"f1", sicilNo:"S-004", ad:"Derya", soyad:"Aksoy", tcNo:"44444444444", dogumTarihi:"1992-05-30", cinsiyet:"Kadın", medeniHal:"Evli", askerlik:"---", email:"derya@anadolu.com", telefon:"0532 444 4444", adres:"Bursa", departman:"Üretim", bolum:"Mühendislik", unvan:"Üretim Mühendisi", gorevBaslangic:"2020-08-20", oncekiIsyeri:"", maas:95000, sosyalMaas:12000, yemekUcreti:3500, yolUcreti:2000, primOrani:0, iban:"TR33 0006 7003", banka:"Yapı Kredi", saglik:"Tam", yakinAd:"Ali Aksoy", yakinTelefon:"0532 444 5555", ehliyet:"B", ingilizce:"Orta", izinGunu:16, kullanilanIzin:8, kalanIzin:8, toplamMesai:24, avans:0, durum:"Aktif" },
  { id:"pe5", firmaId:"f1", sicilNo:"S-005", ad:"Emre", soyad:"Yıldız", tcNo:"55555555555", dogumTarihi:"1995-09-12", cinsiyet:"Erkek", medeniHal:"Bekar", askerlik:"Yapıldı", email:"emre@anadolu.com", telefon:"0532 555 5555", adres:"İstanbul", departman:"Lojistik", bolum:"Depo", unvan:"Depo Sorumlusu", gorevBaslangic:"2021-03-05", oncekiIsyeri:"", maas:72000, sosyalMaas:8000, yemekUcreti:3500, yolUcreti:2000, primOrani:0, iban:"TR12 0001 0012", banka:"Ziraat Bankası", saglik:"Tam", yakinAd:"", yakinTelefon:"", ehliyet:"B", ingilizce:"Başlangıç", izinGunu:10, kullanilanIzin:2, kalanIzin:8, toplamMesai:16, avans:0, durum:"Aktif" },
];

const fisKayitlari: D.FisKayit[] = [
  { id:"fk1", firmaId:"f1", gorselYolu:"", thumbnailYolu:"", tarih:"2026-06-10", saat:"18:30", firmaAdi:"Shell Akaryakıt", vergiNo:"1234567890", toplam:2850, kdv:456, matrah:2394, paraBirimi:"TRY", kur:1, tlKarsiligi:2850, kategori:"Akaryakıt", altKategori:"Yakıt Giderleri", aiKategori:"Akaryakıt", aiGuven:98, ocrMetin:"SHELL PETROL\\nTARİH: 10/06/2026\\nTOPLAM: 2.850,00 TL\\nKDV: 456,00 TL\\nMATRAH: 2.394,00 TL", ocrSatirlar:[], durum:"Islendi", muhasebeFisiId:"y5", giderId:"", projeId:"", bankaHareketId:"", olusturanId:"u3", olusturmaTarihi:"2026-06-10T18:35:00Z" },
  { id:"fk2", firmaId:"f1", gorselYolu:"", thumbnailYolu:"", tarih:"2026-06-09", saat:"13:15", firmaAdi:"Migros", vergiNo:"9876543210", toplam:1240, kdv:99.2, matrah:1140.8, paraBirimi:"TRY", kur:1, tlKarsiligi:1240, kategori:"Yemek", altKategori:"Personel Yemeği", aiKategori:"Yemek Giderleri", aiGuven:95, ocrMetin:"MİGROS MARKET\\nTARİH: 09/06/2026\\nTOPLAM: 1.240,00 TL\\nKDV: 99,20 TL", ocrSatirlar:[], durum:"Islendi", muhasebeFisiId:"", giderId:"", projeId:"", bankaHareketId:"", olusturanId:"u2", olusturmaTarihi:"2026-06-09T13:20:00Z" },
  { id:"fk3", firmaId:"f1", gorselYolu:"", thumbnailYolu:"", tarih:"2026-06-08", saat:"10:00", firmaAdi:"THY", vergiNo:"5556667778", toplam:4850, kdv:776, matrah:4074, paraBirimi:"TRY", kur:1, tlKarsiligi:4850, kategori:"Ulaşım", altKategori:"Uçak Bileti", aiKategori:"Seyahat Giderleri", aiGuven:92, ocrMetin:"TÜRK HAVA YOLLARI\\nTARİH: 08/06/2026\\nTOPLAM: 4.850,00 TL\\nKDV: 776,00 TL", ocrSatirlar:[], durum:"Islendi", muhasebeFisiId:"", giderId:"", projeId:"pr1", bankaHareketId:"", olusturanId:"u1", olusturmaTarihi:"2026-06-08T10:10:00Z" },
  { id:"fk4", firmaId:"f4", gorselYolu:"", thumbnailYolu:"", tarih:"2026-06-10", saat:"14:20", firmaAdi:"Starbucks", vergiNo:"-", toplam:185, kdv:14.8, matrah:170.2, paraBirimi:"TRY", kur:1, tlKarsiligi:185, kategori:"Yemek", altKategori:"Kişisel Harcama", aiKategori:"Kişisel Gider", aiGuven:88, ocrMetin:"STARBUCKS COFFEE\\nTARİH: 10/06/2026\\nTOPLAM: 185,00 TL", ocrSatirlar:[], durum:"Islendi", muhasebeFisiId:"", giderId:"", projeId:"", bankaHareketId:"", olusturanId:"u7", olusturmaTarihi:"2026-06-10T14:25:00Z" },
];

const dovizKurlari: D.DovizKur[] = [
  { kod:"TRY", ad:"Türk Lirası", sembol:"₺", alis:1, satis:1, efektif:1, degisim:0, oncekiKapanis:1, yuksek:1, dusuk:1, hacim:0, saat:"18:00" },
  { kod:"USD", ad:"Amerikan Doları", sembol:"$", alis:38.38, satis:38.48, efektif:38.43, degisim:0.85, oncekiKapanis:38.15, yuksek:38.65, dusuk:38.20, hacim:1250000000, saat:"18:00" },
  { kod:"EUR", ad:"Euro", sembol:"€", alis:43.14, satis:43.28, efektif:43.21, degisim:-0.32, oncekiKapanis:43.32, yuksek:43.45, dusuk:43.05, hacim:890000000, saat:"18:00" },
];

const aiAnalizler: D.AiAnaliz[] = [
  { id:"ai1", firmaId:"f1", tur:"nakitAkisi", tarih:"2026-06-10", sonuc:"Pozitif", detay:"30 günlük nakit akışı: +₺2.4M net", data:{tahmin30:2400000, gercek20:1850000, sapma:22} },
  { id:"ai2", firmaId:"f1", tur:"riskAnaliz", tarih:"2026-06-10", sonuc:"Yüksek Risk", detay:"Mavi Kimya Ltd. - vade aşımı %65", data:{riskSkoru:68, vadeAsimi:520000, tavsiye:"Hemen iletişime geç"} },
];

const aiGunlukOzet: D.AiGunlukOzet = {
  id:"go1", firmaId:"f1", tarih:"2026-06-10", baslik:"Günlük Yönetici Özeti - 10 Haziran 2026",
  icerik:"Bugün 3 yeni satış faturası oluşturuldu. KDV tahsilatı: ₺98.000. Banka hesaplarında toplam ₺5.67M bakiye var.",
  kritik:["Mavi Kimya Ltd. vade aşımı 90+ gün","Elektrik Motoru 5.5kW minimum stok altında (12/15)"],
  oneri:["Mavi Kimya ile hemen iletişime geç","Tedarikçiden yeniden sipariş ver"],
  hasalat:850000, odeme:145000, kasa:285000, banka:2572000,
  riskliCariler:["Mavi Kimya Ltd. (₺520.000)", "Yıldırım Lojistik (₺185.000)"],
  stokUyari:["Elektrik Motoru 5.5kW - Kritik seviye"],
  gorevHatirlatma:["Haziran KDV beyannamesi - 20 Haziran'a kadar"],
};

// ═══════════════════════════════════════════════════════════════
// MENÜ
// ═══════════════════════════════════════════════════════════════
type MenuItem = { key: D.ModulKey; label: string; group: string };
const menuItems: MenuItem[] = [
  {key:"dashboard",label:"Dashboard",group:"Ana"},
  {key:"muhasebe",label:"Muhasebe",group:"Finans"},
  {key:"cari",label:"Cari Hesaplar",group:"Finans"},
  {key:"banka",label:"Banka Yönetimi",group:"Finans"},
  {key:"kasa",label:"Kasa Yönetimi",group:"Finans"},
  {key:"fatura",label:"Faturalar",group:"Finans"},
  {key:"tahsilat",label:"Tahsilat",group:"Finans"},
  {key:"odeme",label:"Ödeme",group:"Finans"},
  {key:"stok",label:"Stok & Depo",group:"Operasyon"},
  {key:"urun",label:"Ürün Yönetimi",group:"Operasyon"},
  {key:"satis",label:"Satış Yönetimi",group:"Ticaret"},
  {key:"teklif",label:"Teklif Yönetimi",group:"Ticaret"},
  {key:"siparis",label:"Siparişler",group:"Ticaret"},
  {key:"satinalma",label:"Satın Alma",group:"Ticaret"},
  {key:"crm",label:"CRM",group:"İlişki"},
  {key:"proje",label:"Proje Yönetimi",group:"İlişki"},
  {key:"arge",label:"ARGE",group:"İlişki"},
  {key:"hr",label:"İnsan Kaynakları",group:"İK"},
  {key:"gorev",label:"Görev Yönetimi",group:"İK"},
  {key:"takvim",label:"Takvim & Ajanda",group:"İK"},
  {key:"rapor",label:"Raporlama",group:"Analiz"},
  {key:"ai",label:"AI Asistan",group:"Analiz"},
  {key:"fisOkuma",label:"Fiş Okuma",group:"Analiz"},
  {key:"botYonetimi",label:"Bot Yönetimi",group:"Analiz"},
  {key:"evrak",label:"Evrak Yönetimi",group:"Sistem"},
  {key:"ayar",label:"Ayarlar",group:"Sistem"},
];

// ═══════════════════════════════════════════════════════════════
// UI PRİMİTİFLER
// ═══════════════════════════════════════════════════════════════
const cn = (...classes: (string | undefined | false | null)[]): string =>
  classes.filter(Boolean).join(" ");

function Card({children,className}:{children:ReactNode;className?:string}) {
  return <div className={cn("rounded-2xl border border-white/[0.07] bg-surface-2/80 backdrop-blur-xl p-5",className)}>{children}</div>;
}

function Metric({label,value,delta,tone="cyan",icon}:{label:string;value:string;delta?:number;tone?:string;icon?:ReactNode}) {
  const colors: Record<string,string> = {
    cyan:"from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
    emerald:"from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    amber:"from-amber-500/20 to-amber-500/5 border-amber-500/20",
    rose:"from-rose-500/20 to-rose-500/5 border-rose-500/20",
    violet:"from-violet-500/20 to-violet-500/5 border-violet-500/20",
    blue:"from-blue-500/20 to-blue-500/5 border-blue-500/20",
  };
  return (
    <div className={cn("rounded-2xl border bg-gradient-to-br p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg",colors[tone]||colors.cyan)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">{label}</span>
        {icon && <span className="text-white/30">{icon}</span>}
      </div>
      <div className="mt-3 text-2xl font-bold text-white tracking-tight">{value}</div>
      {delta!==undefined && (
        <div className={cn("mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",delta>=0?"bg-emerald-500/15 text-emerald-300":"bg-rose-500/15 text-rose-300")}>
          {delta>=0?"▲":"▼"} {Math.abs(delta)}%
        </div>
      )}
    </div>
  );
}

function Badge({children,tone="slate"}:{children:ReactNode;tone?:string}) {
  const c:Record<string,string> = {
    slate:"bg-slate-500/10 text-slate-300 ring-slate-500/20",
    cyan:"bg-cyan-500/10 text-cyan-300 ring-cyan-500/20",
    emerald:"bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
    amber:"bg-amber-500/10 text-amber-300 ring-amber-500/20",
    rose:"bg-rose-500/10 text-rose-300 ring-rose-500/20",
    violet:"bg-violet-500/10 text-violet-300 ring-violet-500/20",
    blue:"bg-blue-500/10 text-blue-300 ring-blue-500/20",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1",c[tone]||c.slate)}>{children}</span>;
}

function Btn({children,className,...p}:React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...p} className={cn("inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20 hover:border-cyan-400/30 disabled:opacity-40",className)}>{children}</button>;
}

function GhostBtn({children,className,...p}:React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...p} className={cn("inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.07] hover:border-white/[0.12]",className)}>{children}</button>;
}

function Input(p:React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...p} className={cn("w-full rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500/40 focus:bg-white/[0.06] transition",p.className)}/>;
}

function Select(p:React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...p} className={cn("w-full rounded-xl border border-white/[0.07] bg-surface-2 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500/40 transition",p.className)}/>;
}

function Progress({value,max=100,tone="cyan"}:{value:number;max?:number;tone?:string}) {
  const c:Record<string,string> = { cyan:"from-cyan-400 to-blue-500", emerald:"from-emerald-400 to-teal-500", amber:"from-amber-400 to-orange-500", rose:"from-rose-400 to-pink-500" };
  return <div className="h-2 rounded-full bg-white/5 overflow-hidden"><div className={cn("h-full rounded-full bg-gradient-to-r transition-all",c[tone]||c.cyan)} style={{width:`${Math.min(100,Math.max(0,(value/max)*100))}%`}}/></div>;
}

function Tab({tabs,active,onChange}:{tabs:{key:string;label:string}[];active:string;onChange:(k:string)=>void}) {
  return (
    <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1 border border-white/[0.05]">
      {tabs.map(t=>(
        <button key={t.key} onClick={()=>onChange(t.key)} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition",active===t.key?"bg-cyan-500/15 text-cyan-200 border border-cyan-500/20":"text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent")}>{t.label}</button>
      ))}
    </div>
  );
}

type Col<T> = { h:string; cell:(r:T)=>ReactNode; w?:string };
function DataTable<T>({rows,cols,rowKey,empty="Kayıt yok",pageSize=8}:{rows:T[];cols:Col<T>[];rowKey:(r:T)=>string;empty?:string;pageSize?:number}) {
  const [pg,setPg]=useState(1);
  useEffect(()=>setPg(1),[rows.length]);
  const total=Math.max(1,Math.ceil(rows.length/pageSize));
  const slice=rows.slice((pg-1)*pageSize,pg*pageSize);
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/[0.05] bg-white/[0.02]">
            {cols.map(c=><th key={c.h} className={cn("px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400",c.w)}>{c.h}</th>)}
          </tr></thead>
          <tbody>
            {slice.length?slice.map((r,i)=>(
              <tr key={rowKey(r)} className={cn("border-b border-white/[0.03] transition hover:bg-white/[0.03]",i%2===0&&"bg-white/[0.01]")}>
                {cols.map(c=><td key={c.h} className={cn("px-4 py-3 text-slate-200",c.w)}>{c.cell(r)}</td>)}
              </tr>
            )):(
              <tr><td colSpan={cols.length} className="px-4 py-10 text-center text-slate-500">{empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {rows.length>pageSize&&(
        <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
          <span>Sayfa {pg}/{total} ({rows.length} kayıt)</span>
          <div className="flex gap-1">
            <button onClick={()=>setPg(Math.max(1,pg-1))} disabled={pg===1} className="px-3 py-1 rounded-lg border border-white/[0.07] hover:bg-white/[0.05] disabled:opacity-30 transition">‹</button>
            <button onClick={()=>setPg(Math.min(total,pg+1))} disabled={pg===total} className="px-3 py-1 rounded-lg border border-white/[0.07] hover:bg-white/[0.05] disabled:opacity-30 transition">›</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Spark({values,color="stroke-cyan-400"}:{values:number[];color?:string}) {
  if(values.length<2) return null;
  const w=200,h=50,mn=Math.min(...values),mx=Math.max(...values),rng=mx-mn||1;
  const d=values.map((v,i)=>`${i===0?"M":"L"}${(i/(values.length-1)*w).toFixed(1)},${(h-((v-mn)/rng)*(h-8)-4).toFixed(1)}`).join(" ");
  return <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14 overflow-visible"><path d={d} fill="none" className={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function PageHead({title,sub,action}:{title:string;sub:string;action?:ReactNode}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-slate-400">{sub}</p></div>
      {action}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SAAS PLATFORM — GİRİŞ
// ═══════════════════════════════════════════════════════════════
function LoginView({onLogin}:{onLogin:(firmaId:string,kullaniciId:string)=>void}) {
  const [email,setEmail]=useState("ahmet@anadolu.com");
  const [sifre,setSifre]=useState("demo");
  const [firmaId,setFirmaId]=useState("f1");
  const [hata,setHata]=useState("");

  const handleLogin=()=>{
    const kullanici=firmaKullanicilari.find(u=>u.email===email&&u.firmaId===firmaId);
    if(kullanici&&sifre.length>0){
      onLogin(firmaId,kullanici.id);
    } else {
      setHata("Geçersiz e-posta veya şifre");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/[0.04] blur-[120px] animate-float"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-500/[0.04] blur-[120px]"/>
      </div>
      <div className="relative w-full max-w-md animate-fadeIn">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold text-2xl shadow-lg shadow-cyan-500/20">M</div>
            <h2 className="mt-4 text-2xl font-bold text-white">MAVERA ERP</h2>
            <p className="mt-2 text-sm text-slate-400">Kurumsal Yönetim Sistemi — SaaS Platform</p>
          </div>

          {hata&&<div className="mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-300">{hata}</div>}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-slate-400 uppercase tracking-wider">Firma Seç</label>
              <Select value={firmaId} onChange={e=>{setFirmaId(e.target.value);setEmail(firmaKullanicilari.find(u=>u.firmaId===e.target.value)?.email||"");}}>
                {firmalar.map(f=>{
                  const kulSay=firmaKullanicilari.filter(u=>u.firmaId===f.id).length;
                  return <option key={f.id} value={f.id}>{f.ad} ({kulSay} kullanıcı)</option>;
                })}
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-slate-400 uppercase tracking-wider">E-posta</label>
              <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ornek@firma.com"/>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-slate-400 uppercase tracking-wider">Şifre</label>
              <Input type="password" value={sifre} onChange={e=>setSifre(e.target.value)} placeholder="••••••"/>
            </div>
            <Btn className="w-full justify-center py-3" onClick={handleLogin}>Giriş Yap</Btn>
          </div>

          <div className="mt-6 rounded-xl bg-white/[0.03] p-4">
            <p className="text-xs text-slate-500 text-center mb-3">Demo Hesapları</p>
            <div className="space-y-2 text-xs text-slate-400">
              {firmaKullanicilari.slice(0,4).map(u=>{
                const f=firmalar.find(x=>x.id===u.firmaId);
                return (
                  <button key={u.id} onClick={()=>{setEmail(u.email);setFirmaId(u.firmaId);}} className="flex w-full items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 hover:bg-white/[0.06] transition text-left">
                    <span><span className="text-white">{u.ad} {u.soyad}</span> — {u.rol}</span>
                    <Badge tone="cyan">{f?.ad}</Badge>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-500">
          <span>{firmalar.length} Firma</span>
          <span>·</span>
          <span>{firmaKullanicilari.length} Kullanıcı</span>
          <span>·</span>
          <span>Süper Admin: admin@mavera.com</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ANA UYGULAMA
// ═══════════════════════════════════════════════════════════════
type AppStore = {
  aktifFirmaId: string;
  aktifKullaniciId: string;
  aktifModul: D.ModulKey;
  arama: string;
  sideOpen: boolean;
  sistemModu: "firma" | "platform";
};

export default function App() {
  const [store,setStore]=useState<AppStore>({aktifFirmaId:"f1",aktifKullaniciId:"u1",aktifModul:"dashboard",arama:"",sideOpen:false,sistemModu:"firma"});
  const [toast,setToast]=useState<{id:string;msg:string;tip:string}[]>([]);

  const addToast=useCallback((msg:string,tip="success")=>{
    const id=D.uid("t");
    setToast(p=>[{id,msg,tip},...p].slice(0,4));
    setTimeout(()=>setToast(p=>p.filter(x=>x.id!==id)),5000);
  },[]);

  const aktifFirma=firmalar.find(f=>f.id===store.aktifFirmaId)||firmalar[0];
  const aktifKullanici=firmaKullanicilari.find(u=>u.id===store.aktifKullaniciId)||firmaKullanicilari[0];
  const izinler=new Set(D.rolePermissions[aktifKullanici.rol]||[]);

  const goModul=(mod:D.ModulKey)=>{
    if(!izinler.has(mod)){addToast("Bu modüle erişiminiz yok","error");return;}
    setStore(p=>({...p,aktifModul:mod,sideOpen:false}));
  };

  const fbf=(firmaId:string)=>(list:any[])=>list.filter((x:any)=>x.firmaId===firmaId);

  if(store.aktifKullaniciId===""){
    return <LoginView onLogin={(fid,uid)=>setStore(p=>({...p,aktifFirmaId:fid,aktifKullaniciId:uid}))}/>;
  }

  const groups=useMemo(()=>{
    const m=new Map<string,MenuItem[]>();
    menuItems.forEach(item=>{if(!m.has(item.group))m.set(item.group,[]);m.get(item.group)!.push(item);});
    return m;
  },[]);

  const modulIcons:Record<string,(c?:string)=>ReactNode> = {
    dashboard:icons.dashboard,muhasebe:icons.muhasebe,cari:icons.cari,banka:icons.banka,kasa:icons.kasa,
    fatura:icons.fatura,tahsilat:icons.banka,odeme:icons.kasa,stok:icons.stok,urun:icons.stok,
    satis:icons.satis,teklif:icons.satis,siparis:icons.stok,satinalma:icons.stok,crm:icons.crm,
    proje:icons.proje,arge:icons.arge,hr:icons.hr,gorev:icons.gorev,takvim:icons.gorev,
    rapor:icons.rapor,ai:icons.ai,fisOkuma:icons.fis,botYonetimi:icons.bot,
    evrak:icons.fatura,ayar:icons.ayar,
  };

  const aktifFirmaKullanicilari=firmaKullanicilari.filter(u=>u.firmaId===store.aktifFirmaId);
  const aktifFirmaAuditleri=auditLogs.filter(a=>a.firmaId===store.aktifFirmaId);
  const aktifFirmaCarileri=fbf(store.aktifFirmaId)(cariHesaplar);
  const aktifFirmaBankalari=fbf(store.aktifFirmaId)(bankaHesaplari);
  const aktifFirmaKasalari=fbf(store.aktifFirmaId)(kasaHesaplari);
  const aktifFirmaFaturalari=fbf(store.aktifFirmaId)(faturalar);
  const aktifFirmaUrunler=fbf(store.aktifFirmaId)(urunler);
  const aktifFirmaCrm=fbf(store.aktifFirmaId)(crmLeadler);
  const aktifFirmaProjeler=fbf(store.aktifFirmaId)(projeler);
  const aktifFirmaGorevler=fbf(store.aktifFirmaId)(gorevler);
  const aktifFirmaPersoneller=fbf(store.aktifFirmaId)(personeller);
  const aktifFirmaFisleri=fbf(store.aktifFirmaId)(fisKayitlari);
  const aktifFirmaYevmiyeler=fbf(store.aktifFirmaId)(yevmiyeFisleri);

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-slate-100">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/3 w-[800px] h-[800px] rounded-full bg-cyan-500/[0.04] blur-[120px] animate-float"/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-500/[0.04] blur-[120px]"/>
      </div>

      {store.sideOpen&&<div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={()=>setStore(p=>({...p,sideOpen:false}))}/>}

      {/* SIDEBAR */}
      <aside className={cn("fixed inset-y-0 left-0 z-40 w-72 flex flex-col border-r border-white/[0.06] bg-surface/95 backdrop-blur-2xl transition-transform lg:static lg:translate-x-0",store.sideOpen?"translate-x-0":"-translate-x-full")}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.06]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/20">M</div>
          <div>
            <div className="text-sm font-bold tracking-wide text-white">MAVERA ERP</div>
            <div className="text-[10px] text-slate-500 tracking-widest uppercase">
              {store.sistemModu==="platform"?"PLATFORM YÖNETİMİ":"KURUMSAL YÖNETİM"}
            </div>
          </div>
          <button className="ml-auto lg:hidden text-slate-400" onClick={()=>setStore(p=>({...p,sideOpen:false}))}>{icons.close()}</button>
        </div>

        {/* Sistem Modu */}
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <div className="flex gap-2">
            <button onClick={()=>setStore(p=>({...p,sistemModu:"firma",aktifModul:"dashboard"}))} className={cn("flex-1 rounded-lg px-3 py-2 text-xs font-medium transition",store.sistemModu==="firma"?"bg-cyan-500/15 text-cyan-200 border border-cyan-500/20":"text-slate-400 hover:bg-white/[0.05] border border-transparent")}>
              Firma Modu
            </button>
            <button onClick={()=>setStore(p=>({...p,sistemModu:"platform",aktifModul:"dashboard"}))} className={cn("flex-1 rounded-lg px-3 py-2 text-xs font-medium transition",store.sistemModu==="platform"?"bg-violet-500/15 text-violet-200 border border-violet-500/20":"text-slate-400 hover:bg-white/[0.05] border border-transparent")}>
              Platform
            </button>
          </div>
        </div>

        {/* Firma Seçici */}
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <Select value={store.aktifFirmaId} onChange={e=>setStore(p=>({...p,aktifFirmaId:e.target.value,aktifModul:"dashboard"}))}>
            {firmalar.map(f=>{
              const aktifKulSay=firmaKullanicilari.filter(u=>u.firmaId===f.id).length;
              return <option key={f.id} value={f.id}>{f.ad} [{aktifKulSay}]</option>;
            })}
          </Select>
          <div className="mt-2 flex items-center justify-between">
            <Badge tone={aktifFirma.tip==="kurumsal"?"violet":aktifFirma.tip==="orta"?"cyan":aktifFirma.tip==="kobi"?"emerald":"amber"}>
              {aktifFirma.tip==="sahis"?"Şahıs":aktifFirma.tip==="kobi"?"KOBİ":aktifFirma.tip==="orta"?"Orta Ölçek":"Kurumsal"}
            </Badge>
            <Badge tone="emerald">{aktifFirma.paket}</Badge>
          </div>
        </div>

        {/* Menü */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {Array.from(groups).map(([group,items])=>(
            <div key={group}>
              <div className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{group}</div>
              <div className="space-y-0.5">
                {items.map(item=>{
                  const ok=izinler.has(item.key);
                  const active=store.aktifModul===item.key;
                  const ic=modulIcons[item.key];
                  return (
                    <button key={item.key} onClick={()=>goModul(item.key)} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",active?"bg-cyan-500/15 text-cyan-200 border border-cyan-500/20":"text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent",!ok&&"opacity-30")}>
                      {ic&&ic()}{item.label}
                      {!ok&&<span className="ml-auto">{icons.lock()}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Kullanıcı */}
        <div className="border-t border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-xs font-bold text-white">{aktifKullanici.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{aktifKullanici.ad} {aktifKullanici.soyad}</div>
              <div className="text-xs text-slate-500">{aktifKullanici.rol}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TOPBAR */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/[0.06] bg-surface/80 backdrop-blur-2xl px-4 py-3 sm:px-6">
          <button className="lg:hidden text-slate-400" onClick={()=>setStore(p=>({...p,sideOpen:true}))}>{icons.menu()}</button>
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{icons.search("w-4 h-4")}</span>
            <Input placeholder="Modül, cari, fiş, ürün ara..." value={store.arama} onChange={e=>setStore(p=>({...p,arama:e.target.value}))} className="pl-10"/>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {dovizKurlari.filter(k=>k.kod!=="TRY").map(k=>(
              <div key={k.kod} className="hidden sm:flex items-center gap-1.5 rounded-lg bg-white/[0.03] px-3 py-1.5 text-xs border border-white/[0.05]">
                <span className="font-semibold text-white">{k.kod}</span>
                <span className="text-slate-400">{k.satis.toFixed(2)}</span>
                <span className={k.degisim>=0?"text-emerald-400":"text-rose-400"}>{k.degisim>=0?"▲":"▼"}{Math.abs(k.degisim)}%</span>
              </div>
            ))}
            <button className="relative rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5 text-slate-400 hover:text-white transition">
              {icons.bell()}
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                {aktifFirmaCarileri.filter(c=>c.durum==="Riskli"||c.durum==="İzlemede").length}
              </span>
            </button>
            <button onClick={()=>setStore(p=>({...p,aktifKullaniciId:""}))} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-slate-400 hover:text-white transition">
              Çıkış
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px] animate-fadeIn">
            <MainContent
              store={store}
              aktifFirma={aktifFirma}
              aktifKullanici={aktifKullanici}
              izinler={izinler}
              goModul={goModul}
              addToast={addToast}
              fbf={fbf}
              aktifFirmaKullanicilari={aktifFirmaKullanicilari}
              aktifFirmaAuditleri={aktifFirmaAuditleri}
              aktifFirmaCarileri={aktifFirmaCarileri}
              aktifFirmaBankalari={aktifFirmaBankalari}
              aktifFirmaKasalari={aktifFirmaKasalari}
              aktifFirmaFaturalari={aktifFirmaFaturalari}
              aktifFirmaUrunler={aktifFirmaUrunler}
              aktifFirmaCrm={aktifFirmaCrm}
              aktifFirmaProjeler={aktifFirmaProjeler}
              aktifFirmaGorevler={aktifFirmaGorevler}
              aktifFirmaPersoneller={aktifFirmaPersoneller}
              aktifFirmaFisleri={aktifFirmaFisleri}
              aktifFirmaYevmiyeler={aktifFirmaYevmiyeler}
              aiGunlukOzet={aiGunlukOzet}
            />
          </div>
        </main>
      </div>

      {/* TOAST */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
        {toast.map(t=>(
          <div key={t.id} className={cn("rounded-xl border p-4 shadow-2xl backdrop-blur-xl animate-slideIn",t.tip==="success"?"border-emerald-500/30 bg-emerald-950/80":"border-rose-500/30 bg-rose-950/80")}>
            <div className="flex items-center gap-2">
              {t.tip==="success"?icons.check("w-4 h-4 text-emerald-400"):icons.warn("w-4 h-4 text-rose-400")}
              <span className="text-sm text-white">{t.msg}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ANA İÇERİK — MODÜL ROUTER
// ═══════════════════════════════════════════════════════════════
type MainContentProps = {
  store: AppStore; aktifFirma: D.Firma; aktifKullanici: D.Kullanici;
  izinler: Set<D.ModulKey>; goModul: (m: D.ModulKey)=>void; addToast: (m:string,t?:string)=>void;
  fbf: (firmaId:string)=>(list:any[])=>any[];
  aktifFirmaKullanicilari: D.Kullanici[]; aktifFirmaAuditleri: D.AuditLog[];
  aktifFirmaCarileri: D.CariHesap[]; aktifFirmaBankalari: D.BankaHesabi[];
  aktifFirmaKasalari: D.KasaHesabi[]; aktifFirmaFaturalari: D.Fatura[];
  aktifFirmaUrunler: D.Urun[]; aktifFirmaCrm: D.CrmLead[];
  aktifFirmaProjeler: D.Proje[]; aktifFirmaGorevler: D.Gorev[];
  aktifFirmaPersoneller: D.Personel[]; aktifFirmaFisleri: D.FisKayit[];
  aktifFirmaYevmiyeler: D.YevmiyeFisi[];
  aiGunlukOzet: D.AiGunlukOzet;
};

function MainContent(props: MainContentProps) {
  const {store,aktifFirma,aktifKullanici,izinler,goModul,addToast,fbf}=props;

  if(!izinler.has(store.aktifModul)) return <NoAccess/>;

  switch(store.aktifModul) {
    case "dashboard": return <DashboardContent {...props}/>;
    case "muhasebe": return <MuhasebeContent {...props}/>;
    case "cari": return <CariContent {...props}/>;
    case "banka": return <BankaContent {...props}/>;
    case "kasa": return <KasaContent {...props}/>;
    case "fatura": return <FaturaContent {...props}/>;
    case "stok": return <StokContent {...props}/>;
    case "satis": return <SatisContent {...props}/>;
    case "crm": return <CrmContent {...props}/>;
    case "proje": return <ProjeContent {...props}/>;
    case "hr": return <HrContent {...props}/>;
    case "gorev": return <GorevContent {...props}/>;
    case "rapor": return <RaporContent {...props}/>;
    case "ai": return <AiContent {...props}/>;
    case "fisOkuma": return <FisOkumaContent {...props}/>;
    case "botYonetimi": return <BotContent {...props}/>;
    case "ayar": return <AyarContent {...props}/>;
    default: return <DashboardContent {...props}/>;
  }
}

function NoAccess() {
  return (
    <Card className="text-center py-20">
      <div className="text-amber-400 mb-4">{icons.lock("w-16 h-16 mx-auto")}</div>
      <h2 className="text-2xl font-bold text-white mb-2">Erişim Engellendi</h2>
      <p className="text-slate-400 max-w-md mx-auto">Seçili rol bu modüle erişim yetkisine sahip değil.</p>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════
function DashboardContent({store,aktifFirma,aktifKullanici,goModul,addToast,fbf,aktifFirmaCarileri,aktifFirmaProjeler,aktifFirmaGorevler,aktifFirmaFaturalari,aktifFirmaBankalari,aktifFirmaKasalari,aktifFirmaUrunler,aktifFirmaCrm,aiGunlukOzet}:MainContentProps) {
  const toplamBanka=aktifFirmaBankalari.reduce((a,b)=>a+(b.paraBirimi==="TRY"?b.bakiye:b.bakiye*38.48),0);
  const toplamKasa=aktifFirmaKasalari.reduce((a,k)=>a+(k.paraBirimi==="TRY"?k.bakiye:k.bakiye*38.48),0);
  const toplamCiro=aktifFirmaFaturalari.filter(f=>f.durum==="Ödendi"||f.durum==="Kısmi").reduce((a,f)=>a+f.genelToplam,0);
  const alacak=aktifFirmaCarileri.filter(c=>c.bakiye>0).reduce((a,c)=>a+c.bakiye,0);
  const stokUyari=aktifFirmaUrunler.filter(u=>u.kritik).length;
  const riskliCariler=aktifFirmaCarileri.filter(c=>c.durum==="Riskli"||c.durum==="İzlemede").length;
  const aktifGorev=aktifFirmaGorevler.filter(g=>g.durum!=="Tamamlandı"&&g.durum!=="Iptal").length;

  return (
    <div className="space-y-6">
      <PageHead
        title={aktifFirma.ad}
        sub={`${aktifFirma.unvan} — ${aktifFirma.sektor} — Hoş geldiniz, ${aktifKullanici.ad}`}
        action={<div className="flex gap-2"><Btn onClick={()=>goModul("satis")}>{icons.plus("w-4 h-4")} Satış</Btn><GhostBtn onClick={()=>goModul("muhasebe")}>{icons.plus("w-4 h-4")} Fiş</GhostBtn><GhostBtn onClick={()=>goModul("crm")}>Lead Ekle</GhostBtn></div>}
      />

      {/* AI Günlük Özet Banner */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/60 to-violet-950/60 p-5 backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-2xl">🤖</div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-white">{aiGunlukOzet.baslik}</h3>
              <Badge tone="cyan">AI</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">{aiGunlukOzet.icerik}</p>
            {aiGunlukOzet.kritik.length>0&&(
              <div className="mt-3 space-y-1.5">
                {aiGunlukOzet.kritik.map((k,i)=>(
                  <div key={i} className="flex items-center gap-2 text-xs text-amber-300">⚠️ {k}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Toplam Ciro" value={D.paraFmt(toplamCiro)} delta={14.2} tone="cyan" icon={icons.satis("w-5 h-5")}/>
        <Metric label="Banka Toplam" value={D.paraFmt(toplamBanka)} delta={8.7} tone="emerald" icon={icons.banka("w-5 h-5")}/>
        <Metric label="Kasa Toplam" value={D.paraFmt(toplamKasa)} delta={-2.1} tone="violet" icon={icons.kasa("w-5 h-5")}/>
        <Metric label="Stok Uyarısı" value={`${stokUyari} ürün`} delta={stokUyari>0?stokUyari*5:0} tone="rose" icon={icons.warn("w-5 h-5")}/>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Alacak" value={D.paraFmt(alacak)} tone="amber" icon={icons.cari("w-5 h-5")}/>
        <Metric label="Riskli Cari" value={`${riskliCariler}`} tone="rose" icon={icons.cari("w-5 h-5")}/>
        <Metric label="Aktif Proje" value={`${aktifFirmaProjeler.length}`} tone="emerald" icon={icons.proje("w-5 h-5")}/>
        <Metric label="Açık Görev" value={`${aktifGorev} adet`} tone="blue" icon={icons.gorev("w-5 h-5")}/>
      </div>

      {/* Grafikler */}
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div><h3 className="font-semibold text-white">Nakit Akışı</h3><p className="text-xs text-slate-500">Haftalık giriş / çıkış</p></div>
            <Badge tone="cyan">Canlı</Badge>
          </div>
          <Spark values={[420,580,510,740,690,820,780]} color="stroke-cyan-400"/>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/[0.03] p-3 text-center"><div className="text-xs text-slate-500">Giriş</div><div className="text-lg font-bold text-emerald-300">₺4.54M</div></div>
            <div className="rounded-xl bg-white/[0.03] p-3 text-center"><div className="text-xs text-slate-500">Çıkış</div><div className="text-lg font-bold text-rose-300">₺3.21M</div></div>
            <div className="rounded-xl bg-white/[0.03] p-3 text-center"><div className="text-xs text-slate-500">Net</div><div className="text-lg font-bold text-cyan-300">₺1.33M</div></div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-white mb-4">Proje Durumu</h3>
          <div className="space-y-3">
            {aktifFirmaProjeler.slice(0,4).map(p=>(
              <div key={p.id} className="rounded-xl bg-white/[0.03] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{p.ad}</span>
                  <Badge tone={p.durum==="Aktif"?"emerald":p.durum==="Tamamlandı"?"cyan":"amber"}>{p.durum}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                  <span>{D.tarihFmt(p.baslangicTarihi)} → {D.tarihFmt(p.bitisTarihi)}</span>
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500">İlerleme</span>
                  <span className="text-white">{p.ilerleme}%</span>
                </div>
                <Progress value={p.ilerleme} tone={p.ilerleme>=80?"emerald":p.ilerleme>=50?"cyan":"amber"}/>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Bütçe</span>
                  <div className="flex gap-3">
                    <span className="text-emerald-300">Planlanan: {D.paraFmt(p.butceDurumu.planlanan)}</span>
                    <span className="text-rose-300">Harcanan: {D.paraFmt(p.butceDurumu.harcanan)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CRM Pipeline & Banka */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-white mb-4">CRM Pipeline</h3>
          <div className="grid grid-cols-6 gap-2 mb-4">
            {["Yeni","Nitelikli","Teklif","Müzakere","Kazandı","Kaybetti"].map(a=>{
              const count=aktifFirmaCrm.filter(c=>c.asama===a).length;
              const total=aktifFirmaCrm.filter(c=>c.asama===a).reduce((acc,c)=>acc+c.deger,0);
              return (
                <div key={a} className="rounded-xl bg-white/[0.03] p-2 text-center">
                  <div className="text-[10px] text-slate-500 uppercase">{a}</div>
                  <div className="text-lg font-bold text-white">{count}</div>
                  <div className="text-[10px] text-cyan-300">{D.paraFmt(total)}</div>
                </div>
              );
            })}
          </div>
          <div className="space-y-2">
            {aktifFirmaCrm.slice(0,3).map(l=>(
              <div key={l.id} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3">
                <div className="min-w-0"><div className="text-sm font-medium text-white truncate">{l.firma}</div><div className="text-xs text-slate-500">{l.ad} {l.soyad}</div></div>
                <div className="text-right shrink-0"><div className="font-bold text-white">{D.paraFmt(l.deger)}</div><Badge tone={l.asama==="Kazandı"?"emerald":l.asama==="Müzakere"?"cyan":"amber"}>{l.asama}</Badge></div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-white mb-4">Banka & Kasa Durumu</h3>
          <div className="space-y-3">
            {aktifFirmaBankalari.map(b=>(
              <div key={b.id} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3">
                <div><div className="text-sm font-medium text-white">{b.bankaAdi}</div><div className="text-xs text-slate-500">{b.subeAdi} · {b.paraBirimi}</div></div>
                <div className="text-right"><div className="font-bold text-white">{D.paraFmt(b.bakiye,b.paraBirimi)}</div><Badge tone="emerald">{b.durum}</Badge></div>
              </div>
            ))}
            {aktifFirmaKasalari.map(k=>(
              <div key={k.id} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3">
                <div className="text-sm font-medium text-white">{k.kasaAdi}</div>
                <div className="font-bold text-white">{D.paraFmt(k.bakiye,k.paraBirimi)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Döviz & Görev */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-white mb-4">Döviz Kurları</h3>
          {dovizKurlari.filter(k=>k.kod!=="TRY").map(k=>(
            <div key={k.kod} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3 mb-2">
              <div><div className="font-semibold text-white">{k.kod} / TRY</div><div className="text-xs text-slate-500">{k.ad}</div></div>
              <div className="text-right">
                <div className="font-bold text-white">₺{k.satis.toFixed(2)}</div>
                <div className={cn("text-xs",k.degisim>=0?"text-emerald-400":"text-rose-400")}>{k.degisim>=0?"▲":"▼"} %{Math.abs(k.degisim)}</div>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 className="font-semibold text-white mb-4">Son Görevler</h3>
          <div className="space-y-2">
            {aktifFirmaGorevler.slice(0,5).map(g=>(
              <div key={g.id} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
                <div className={cn("h-2 w-2 rounded-full shrink-0",g.oncelik==="Kritik"?"bg-rose-400":g.oncelik==="Yüksek"?"bg-amber-400":"bg-cyan-400")}/>
                <div className="flex-1 min-w-0"><div className="text-sm text-white truncate">{g.baslik}</div><div className="text-xs text-slate-500">{g.atananAd} · {D.tarihFmt(g.bitis)}</div></div>
                <Badge tone={g.durum==="Tamamlandı"?"emerald":g.durum==="DevamEdiyor"?"cyan":"amber"}>{g.durum==="DevamEdiyor"?"Devam":g.durum}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MUHASEBE
// ═══════════════════════════════════════════════════════════════
function MuhasebeContent({aktifFirmaYevmiyeler,addToast}:MainContentProps) {
  const [tab,setTab]=useState("fis");
  const [form,setForm]=useState({tarih:new Date().toISOString().slice(0,10),aciklama:"",tutar:""});
  const submit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(!form.aciklama||!form.tutar) return;
    addToast(`Yevmiye fişi oluşturuldu: ${form.aciklama}`);
    setForm(p=>({...p,aciklama:"",tutar:""}));
  };

  return (
    <div className="space-y-6">
      <PageHead title="Muhasebe" sub="Çift taraflı kayıt, yevmiye, mizan, bilanço ve KDV sistemi"/>
      <Tab tabs={[{key:"fis",label:"Yevmiye Fişleri"},{key:"hesap",label:"Hesap Planı"},{key:"mizan",label:"Mizan"},{key:"yeni",label:"Yeni Fiş"}]} active={tab} onChange={setTab}/>

      {tab==="fis"&&(
        <Card>
          <DataTable rows={aktifFirmaYevmiyeler} rowKey={r=>r.id} cols={[
            {h:"Belge No",cell:r=><div><div className="font-medium text-white">{r.belgeNo}</div><div className="text-xs text-slate-500">{D.tarihFmt(r.tarih)} {r.saat}</div></div>},
            {h:"Açıklama",cell:r=>r.aciklama},
            {h:"Borç",cell:r=><span className="text-xs">{r.satir[0]?.hesapAd}</span>},
            {h:"Alacak",cell:r=><span className="text-xs">{r.satir[1]?.hesapAd}</span>},
            {h:"Tutar",cell:r=><span className="font-semibold text-white">{D.paraFmt(r.toplamTutar,r.paraBirimi)}</span>},
            {h:"Durum",cell:r=><Badge tone={r.durum==="Onaylandı"?"emerald":r.durum==="Taslak"?"amber":"rose"}>{r.durum}</Badge>},
          ]}/>
        </Card>
      )}

      {tab==="hesap"&&(
        <Card>
          <DataTable rows={hesapPlani} rowKey={r=>r.kod} cols={[
            {h:"Kod",cell:r=><span className="font-mono font-bold text-cyan-300">{r.kod}</span>},
            {h:"Hesap Adı",cell:r=>r.ad},
            {h:"Tip",cell:r=><Badge tone={r.tip==="Varlık"?"cyan":r.tip==="Gelir"?"emerald":r.tip==="Gider"?"rose":"amber"}>{r.tip}</Badge>},
            {h:"Alt Tip",cell:r=><span className="text-xs text-slate-400">{r.altTip}</span>},
            {h:"Bakiye",cell:r=><span className="font-semibold text-white">{D.paraFmt(r.bakiye)}</span>},
          ]}/>
        </Card>
      )}

      {tab==="mizan"&&(
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-white mb-4">Mizan Özeti</h3>
            {hesapPlani.map(h=>(
              <div key={h.kod} className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                <span className="text-sm"><span className="font-mono text-cyan-300 mr-2">{h.kod}</span>{h.ad}</span>
                <span className="font-semibold text-white text-sm">{D.paraFmt(h.bakiye)}</span>
              </div>
            ))}
          </Card>
          <Card>
            <h3 className="font-semibold text-white mb-4">Bilanço Özeti</h3>
            <div className="space-y-3">
              {[{l:"Toplam Varlıklar",t:"Varlık",v:hesapPlani.filter(h=>h.tip==="Varlık").reduce((a,h)=>a+h.bakiye,0),c:"cyan"},{l:"Toplam Borçlar",t:"Borç",v:hesapPlani.filter(h=>h.tip==="Borç").reduce((a,h)=>a+h.bakiye,0),c:"rose"},{l:"Toplam Gelirler",t:"Gelir",v:hesapPlani.filter(h=>h.tip==="Gelir").reduce((a,h)=>a+h.bakiye,0),c:"emerald"},{l:"Toplam Giderler",t:"Gider",v:hesapPlani.filter(h=>h.tip==="Gider").reduce((a,h)=>a+h.bakiye,0),c:"amber"}].map(x=>(
                <div key={x.l} className={cn("rounded-xl border p-4",x.c==="cyan"?"border-cyan-500/20 bg-cyan-500/5":x.c==="rose"?"border-rose-500/20 bg-rose-500/5":x.c==="emerald"?"border-emerald-500/20 bg-emerald-500/5":"border-amber-500/20 bg-amber-500/5")}>
                  <div className={cn("text-sm",x.c==="cyan"?"text-cyan-300":x.c==="rose"?"text-rose-300":x.c==="emerald"?"text-emerald-300":"text-amber-300")}>{x.l}</div>
                  <div className="text-2xl font-bold text-white">{D.paraFmt(x.v)}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab==="yeni"&&(
        <Card>
          <h3 className="font-semibold text-white mb-4">Yeni Yevmiye Fişi</h3>
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            <Input type="date" value={form.tarih} onChange={(e) => { setForm((p) => ({ ...p, tarih: e.target.value })); }}/>
            <Input placeholder="Aciklama" value={form.aciklama} onChange={(e) => { setForm((p) => ({ ...p, aciklama: e.target.value })); }} required />
            <Input type="number" placeholder="Tutar" value={form.tutar} onChange={(e) => { setForm((p) => ({ ...p, tutar: e.target.value })); }} required />
            <div className="flex items-end"><Btn type="submit">{icons.plus("w-4 h-4")} Fiş Oluştur</Btn></div>
          </form>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CARİ
// ═══════════════════════════════════════════════════════════════
function CariContent({aktifFirmaCarileri}:MainContentProps) {
  return (
    <div className="space-y-6">
      <PageHead title="Cari Hesaplar" sub="Müşteri, tedarikçi, risk limiti ve yaşlandırma raporu"/>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Toplam Cari" value={`${aktifFirmaCarileri.length}`} tone="cyan"/>
        <Metric label="Toplam Alacak" value={D.paraFmt(aktifFirmaCarileri.filter(c=>c.bakiye>0).reduce((a,c)=>a+c.bakiye,0))} tone="emerald"/>
        <Metric label="Toplam Borç" value={D.paraFmt(Math.abs(aktifFirmaCarileri.filter(c=>c.bakiye<0).reduce((a,c)=>a+c.bakiye,0)))} tone="rose"/>
      </div>
      <Card>
        <DataTable rows={aktifFirmaCarileri} rowKey={r=>r.id} cols={[
          {h:"Cari",cell:r=><div><div className="font-medium text-white">{r.ad}</div><div className="text-xs text-slate-500">{r.email}</div></div>},
          {h:"Kod",cell:r=><span className="font-mono text-cyan-300">{r.kod}</span>},
          {h:"Tip",cell:r=><Badge tone={r.tip==="Müşteri"?"cyan":r.tip==="Tedarikçi"?"amber":"violet"}>{r.tip}</Badge>},
          {h:"Bakiye",cell:r=><span className={cn("font-semibold",r.bakiye>=0?"text-emerald-300":"text-rose-300")}>{D.paraFmt(Math.abs(r.bakiye))}</span>},
          {h:"Risk Limiti",cell:r=>D.paraFmt(r.riskLimiti)},
          {h:"0-30",cell:r=>D.paraFmt(r.yaslandirma[0]?.tutar||0)},
          {h:"31-60",cell:r=>D.paraFmt(r.yaslandirma[1]?.tutar||0)},
          {h:"61-90",cell:r=>D.paraFmt(r.yaslandirma[2]?.tutar||0)},
          {h:"90+",cell:r=><span className="text-rose-300">{D.paraFmt(r.yaslandirma[3]?.tutar||0)}</span>},
          {h:"Risk Skoru",cell:r=><div className="w-20"><Progress value={r.riskSkoru} tone={r.riskSkoru>=80?"emerald":r.riskSkoru>=60?"cyan":"amber"}/></div>},
          {h:"Durum",cell:r=><Badge tone={r.durum==="Aktif"?"emerald":r.durum==="İzlemede"?"amber":"rose"}>{r.durum}</Badge>},
        ]}/>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BANKA
// ═══════════════════════════════════════════════════════════════
function BankaContent({aktifFirmaBankalari}:MainContentProps) {
  const toplam=aktifFirmaBankalari.reduce((a,b)=>a+(b.paraBirimi==="TRY"?b.bakiye:b.bakiye*38.48),0);
  return (
    <div className="space-y-6">
      <PageHead title="Banka Yönetimi" sub="Banka hesapları, ekstre işleme ve otomatik mutabakat"/>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Toplam Bakiye (TRY)" value={D.paraFmt(toplam)} tone="cyan"/>
        <Metric label="Hesap Sayısı" value={`${aktifFirmaBankalari.length}`} tone="emerald"/>
        <Metric label="Para Birimleri" value={[...new Set(aktifFirmaBankalari.map(r=>r.paraBirimi))].join(", ")} tone="violet"/>
      </div>
      <Card>
        <DataTable rows={aktifFirmaBankalari} rowKey={r=>r.id} cols={[
          {h:"Banka",cell:r=><div><div className="font-medium text-white">{r.bankaAdi}</div><div className="text-xs text-slate-500">{r.subeAdi} · {r.hesapTuru}</div></div>},
          {h:"Hesap No",cell:r=><span className="font-mono text-xs">{r.hesapNo}</span>},
          {h:"Para Birimi",cell:r=><Badge tone="cyan">{r.paraBirimi}</Badge>},
          {h:"Bakiye",cell:r=><span className="font-bold text-white">{D.paraFmt(r.bakiye,r.paraBirimi)}</span>},
          {h:"Kullanılabilir",cell:r=>D.paraFmt(r.kullanilabilir,r.paraBirimi)},
          {h:"Günlük Limit",cell:r=><span className="text-xs text-slate-400">{D.paraFmt(r.gunlukLimit)}</span>},
          {h:"Durum",cell:r=><Badge tone="emerald">{r.durum}</Badge>},
        ]}/>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// KASA
// ═══════════════════════════════════════════════════════════════
function KasaContent({aktifFirmaKasalari}:MainContentProps) {
  return (
    <div className="space-y-6">
      <PageHead title="Kasa Yönetimi" sub="TL, USD ve EUR kasaları ile nakit akışı"/>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aktifFirmaKasalari.map(k=>(
          <Metric key={k.id} label={k.kasaAdi} value={D.paraFmt(k.bakiye,k.paraBirimi)} tone={k.paraBirimi==="TRY"?"cyan":k.paraBirimi==="USD"?"emerald":"violet"}/>
        ))}
      </div>
      <Card>
        <h3 className="font-semibold text-white mb-4">Kasa Detayları</h3>
        <div className="space-y-3">
          {aktifFirmaKasalari.map(k=>(
            <div key={k.id} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-4">
              <div><div className="font-medium text-white">{k.kasaAdi}</div><div className="text-xs text-slate-500">{k.paraBirimi}</div></div>
              <div className="text-right"><div className="text-sm text-slate-400">{D.paraFmt(k.bakiye,k.paraBirimi)}</div><div className="font-bold text-white">{D.paraFmt(k.paraBirimi==="TRY"?k.bakiye:k.bakiye*38.48)}</div></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FATURA
// ═══════════════════════════════════════════════════════════════
function FaturaContent({aktifFirmaFaturalari}:MainContentProps) {
  return (
    <div className="space-y-6">
      <PageHead title="Fatura Yönetimi" sub="Satış ve alış faturaları, KDV, e-fatura entegrasyonu"/>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Toplam Fatura" value={`${aktifFirmaFaturalari.length}`} tone="cyan"/>
        <Metric label="Ödenen" value={D.paraFmt(aktifFirmaFaturalari.filter(f=>f.durum==="Ödendi").reduce((a,f)=>a+f.genelToplam,0))} tone="emerald"/>
        <Metric label="Vade Geçmiş" value={D.paraFmt(aktifFirmaFaturalari.filter(f=>f.durum==="Vade Geçmiş").reduce((a,f)=>a+f.genelToplam,0))} tone="rose"/>
      </div>
      <Card>
        <DataTable rows={aktifFirmaFaturalari} rowKey={r=>r.id} cols={[
          {h:"Fatura",cell:r=><div><div className="font-medium text-white">{r.faturaNo}</div><div className="text-xs text-slate-500">{r.tip} · {D.tarihFmt(r.tarih)}</div></div>},
          {h:"Cari",cell:r=>r.cariAd},
          {h:"Ara Toplam",cell:r=>D.paraFmt(r.aratoplam,r.paraBirimi)},
          {h:"KDV",cell:r=>D.paraFmt(r.kdvTutari,r.paraBirimi)},
          {h:"Genel Toplam",cell:r=><span className="font-bold text-white">{D.paraFmt(r.genelToplam,r.paraBirimi)}</span>},
          {h:"Vade",cell:r=>D.tarihFmt(r.vadeTarihi)},
          {h:"E-Fatura",cell:r=><Badge tone={r.eFaturaDurumu==="Onaylandı"?"emerald":"amber"}>{r.eFaturaDurumu}</Badge>},
          {h:"Durum",cell:r=><Badge tone={r.durum==="Ödendi"?"emerald":r.durum==="Vade Geçmiş"?"rose":"amber"}>{r.durum}</Badge>},
        ]}/>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STOK
// ═══════════════════════════════════════════════════════════════
function StokContent({aktifFirmaUrunler}:MainContentProps) {
  const alerts=aktifFirmaUrunler.filter(u=>u.kritik);
  return (
    <div className="space-y-6">
      <PageHead title="Stok & Depo Yönetimi" sub="Barkod, seri/lot takip, FIFO/LIFO, depo transfer"/>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Toplam Ürün" value={`${aktifFirmaUrunler.length}`} tone="cyan"/>
        <Metric label="Kritik Stok" value={`${alerts.length}`} tone="rose"/>
        <Metric label="Toplam Değer" value={D.paraFmt(aktifFirmaUrunler.reduce((a,u)=>a+u.toplamDeger,0))} tone="emerald"/>
      </div>
      <Card>
        <DataTable rows={aktifFirmaUrunler} rowKey={r=>r.id} cols={[
          {h:"Ürün",cell:r=><div><div className="font-medium text-white">{r.ad}</div><div className="text-xs text-slate-500">{r.kod} · {r.barcode}</div></div>},
          {h:"Kategori",cell:r=><Badge tone="cyan">{r.kategori}</Badge>},
          {h:"Stok",cell:r=><span className={cn("font-bold",r.kritik?"text-rose-300":"text-emerald-300")}>{D.sayiFmt(r.toplamStok)}</span>},
          {h:"Min",cell:r=>D.sayiFmt(r.minimumStok)},
          {h:"Alış",cell:r=>D.paraFmt(r.alisFiyati)},
          {h:"Satış",cell:r=>D.paraFmt(r.satisFiyati)},
          {h:"KDV",cell:r=>`%${r.kdvOrani}`},
          {h:"Değer",cell:r=>D.paraFmt(r.toplamDeger)},
          {h:"Takip",cell:r=><span className="text-xs text-slate-400">{r.lotTakip?"Lot":"−"}/{r.seriTakip?"Seri":"−"}</span>},
        ]}/>
      </Card>
      {alerts.length>0&&(
        <Card className="border-rose-500/20">
          <h3 className="font-semibold text-rose-300 mb-3">⚠ Kritik Stok Uyarıları</h3>
          <div className="space-y-2">
            {alerts.map(a=>(
              <div key={a.id} className="flex items-center justify-between rounded-xl bg-rose-500/5 border border-rose-500/10 p-3">
                <span className="text-sm text-white">{a.ad}</span>
                <span className="text-sm text-rose-300">{a.toplamStok} / {a.minimumStok} {a.birim}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SATIŞ
// ═══════════════════════════════════════════════════════════════
function SatisContent({aktifFirmaFaturalari,addToast}:MainContentProps) {
  return (
    <div className="space-y-6">
      <PageHead title="Satış Yönetimi" sub="Faturalar, teklifler, siparişler ve tahsilat takibi"/>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Toplam Satış" value={D.paraFmt(aktifFirmaFaturalari.reduce((a,f)=>a+f.genelToplam,0))} delta={13.7} tone="emerald"/>
        <Metric label="Ödenen" value={D.paraFmt(aktifFirmaFaturalari.filter(f=>f.durum==="Ödendi").reduce((a,f)=>a+f.genelToplam,0))} tone="cyan"/>
        <Metric label="Açık" value={D.paraFmt(aktifFirmaFaturalari.filter(f=>f.durum!=="Ödendi"&&f.durum!=="İptal").reduce((a,f)=>a+f.genelToplam,0))} tone="amber"/>
      </div>
      <Card>
        <DataTable rows={aktifFirmaFaturalari} rowKey={r=>r.id} cols={[
          {h:"Fatura",cell:r=><div><div className="font-medium text-white">{r.faturaNo}</div><div className="text-xs text-slate-500">{D.tarihFmt(r.tarih)}</div></div>},
          {h:"Cari",cell:r=>r.cariAd},
          {h:"Tutar",cell:r=><span className="font-bold text-white">{D.paraFmt(r.genelToplam,r.paraBirimi)}</span>},
          {h:"Vade",cell:r=>D.tarihFmt(r.vadeTarihi)},
          {h:"Durum",cell:r=><Badge tone={r.durum==="Ödendi"?"emerald":r.durum==="Vade Geçmiş"?"rose":"amber"}>{r.durum}</Badge>},
        ]}/>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CRM
// ═══════════════════════════════════════════════════════════════
function CrmContent({aktifFirmaCrm,addToast}:MainContentProps) {
  const [form,setForm]=useState({ad:"",soyad:"",firma:"",telefon:"",email:"",deger:""});
  const submit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(!form.firma) return;
    addToast(`Yeni lead eklendi: ${form.firma}`);
    setForm({ad:"",soyad:"",firma:"",telefon:"",email:"",deger:""});
  };
  return (
    <div className="space-y-6">
      <PageHead title="CRM" sub="Potansiyel müşteri, pipeline, görev ve AI analiz"/>
      <div className="grid gap-4 sm:grid-cols-4">
        <Metric label="Toplam Lead" value={`${aktifFirmaCrm.length}`} tone="cyan"/>
        <Metric label="Pipeline Değeri" value={D.paraFmt(aktifFirmaCrm.reduce((a,l)=>a+l.deger,0))} tone="emerald"/>
        <Metric label="Kazanan" value={`${aktifFirmaCrm.filter(l=>l.asama==="Kazandı").length}`} tone="violet"/>
        <Metric label="Acil" value={`${aktifFirmaCrm.filter(l=>l.oncelik==="Acil"||l.oncelik==="Yüksek").length}`} tone="rose"/>
      </div>
      <Card>
        <h3 className="font-semibold text-white mb-4">Yeni Lead Ekle</h3>
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-3">
          <Input placeholder="Ad" value={form.ad} onChange={(e) => { setForm((p) => ({ ...p, ad: e.target.value })); }}/>
          <Input placeholder="Firma" value={form.firma} onChange={(e) => { setForm((p) => ({ ...p, firma: e.target.value })); }} required />
          <Input placeholder="Telefon" value={form.telefon} onChange={(e) => { setForm((p) => ({ ...p, telefon: e.target.value })); }}/>
          <Input placeholder="E-posta" value={form.email} onChange={(e) => { setForm((p) => ({ ...p, email: e.target.value })); }}/>
          <Input type="number" placeholder="Tahmini deger" value={form.deger} onChange={(e) => { setForm((p) => ({ ...p, deger: e.target.value })); }}/>
          <div className="flex items-end"><Btn type="submit">{icons.plus("w-4 h-4")} Lead Ekle</Btn></div>
        </form>
      </Card>
      <Card>
        <DataTable rows={aktifFirmaCrm} rowKey={r=>r.id} cols={[
          {h:"Lead",cell:r=><div><div className="font-medium text-white">{r.ad} {r.soyad}</div><div className="text-xs text-slate-500">{r.firma} · {r.unvan}</div></div>},
          {h:"Kaynak",cell:r=>r.kaynak},
          {h:"Aşama",cell:r=><Badge tone={r.asama==="Kazandı"?"emerald":r.asama==="Müzakere"?"cyan":r.asama==="Kaybetti"?"rose":"amber"}>{r.asama}</Badge>},
          {h:"Değer",cell:r=><span className="font-bold text-white">{D.paraFmt(r.deger)}</span>},
          {h:"Olasılık",cell:r=>`%${r.olasilik}`},
          {h:"Öncelik",cell:r=><Badge tone={r.oncelik==="Acil"?"rose":r.oncelik==="Yüksek"?"amber":"slate"}>{r.oncelik}</Badge>},
          {h:"Sorumlu",cell:r=>r.sorumluAd},
          {h:"Son Görüşme",cell:r=>D.tarihFmt(r.sonGorisme)},
        ]}/>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROJE
// ═══════════════════════════════════════════════════════════════
function ProjeContent({aktifFirmaProjeler}:MainContentProps) {
  return (
    <div className="space-y-6">
      <PageHead title="Proje Yönetimi" sub="Proje, görev, bütçe, ARGE ve kârlılık takibi"/>
      <div className="grid gap-4 sm:grid-cols-4">
        <Metric label="Toplam Proje" value={`${aktifFirmaProjeler.length}`} tone="cyan"/>
        <Metric label="Aktif" value={`${aktifFirmaProjeler.filter(p=>p.durum==="Aktif").length}`} tone="emerald"/>
        <Metric label="Toplam Bütçe" value={D.paraFmt(aktifFirmaProjeler.reduce((a,p)=>a+p.butceDurumu.planlanan,0))} tone="violet"/>
        <Metric label="Toplam Harcama" value={D.paraFmt(aktifFirmaProjeler.reduce((a,p)=>a+p.butceDurumu.harcanan,0))} tone="amber"/>
      </div>
      <Card>
        <DataTable rows={aktifFirmaProjeler} rowKey={r=>r.id} cols={[
          {h:"Proje",cell:r=><div><div className="font-medium text-white">{r.ad}</div><div className="text-xs text-slate-500">{r.kod} · {r.tip}</div></div>},
          {h:"Durum",cell:r=><Badge tone={r.durum==="Aktif"?"emerald":r.durum==="Tamamlandı"?"cyan":"amber"}>{r.durum}</Badge>},
          {h:"Sorumlu",cell:r=>r.sorumluAd},
          {h:"İlerleme",cell:r=><div className="w-24"><Progress value={r.ilerleme} tone={r.ilerleme>=80?"emerald":r.ilerleme>=50?"cyan":"amber"}/></div>},
          {h:"Planlanan",cell:r=>D.paraFmt(r.butceDurumu.planlanan)},
          {h:"Harcanan",cell:r=><span className="text-rose-300">{D.paraFmt(r.butceDurumu.harcanan)}</span>},
          {h:"Kalan",cell:r=>D.paraFmt(r.butceDurumu.kalan)},
          {h:"Kullanım",cell:r=><Badge tone={r.butceDurumu.kullanımOrani>=80?"rose":r.butceDurumu.kullanımOrani>=50?"amber":"emerald"}>{r.butceDurumu.kullanımOrani}%</Badge>},
          {h:"ROI",cell:r=><span className={cn("font-bold",r.kazanc.roi>=0?"text-emerald-300":"text-rose-300")}>{r.kazanc.roi.toFixed(1)}%</span>},
        ]}/>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// İK
// ═══════════════════════════════════════════════════════════════
function HrContent({aktifFirmaPersoneller}:MainContentProps) {
  const toplamMaas=aktifFirmaPersoneller.reduce((a,p)=>a+p.maas,0);
  return (
    <div className="space-y-6">
      <PageHead title="İnsan Kaynakları" sub="Personel, bordro, izin, mesai, avans ve performans"/>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Personel" value={`${aktifFirmaPersoneller.length}`} tone="cyan"/>
        <Metric label="Aylık Bordro" value={D.paraFmt(toplamMaas)} tone="emerald"/>
        <Metric label="Ort. Performans" value={`%${Math.round(aktifFirmaPersoneller.reduce((a,p)=>a+(p.kalanIzin/p.izinGunu)*100,0)/Math.max(1,aktifFirmaPersoneller.length))}`} tone="violet"/>
      </div>
      <Card>
        <DataTable rows={aktifFirmaPersoneller} rowKey={r=>r.id} cols={[
          {h:"Personel",cell:r=><div><div className="font-medium text-white">{r.ad} {r.soyad}</div><div className="text-xs text-slate-500">{r.unvan}</div></div>},
          {h:"Departman",cell:r=>r.departman},
          {h:"Maaş",cell:r=><span className="font-bold text-white">{D.paraFmt(r.maas)}</span>},
          {h:"Kalan İzin",cell:r=>`${r.kalanIzin} gün`},
          {h:"Mesai",cell:r=>`${r.toplamMesai} saat`},
          {h:"Avans",cell:r=>D.paraFmt(r.avans)},
          {h:"Durum",cell:r=><Badge tone={r.durum==="Aktif"?"emerald":"amber"}>{r.durum}</Badge>},
        ]}/>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GÖREV
// ═══════════════════════════════════════════════════════════════
function GorevContent({aktifFirmaGorevler}:MainContentProps) {
  return (
    <div className="space-y-6">
      <PageHead title="Görev Yönetimi" sub="Görev, alt görev, öncelik ve takvim"/>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Toplam Görev" value={`${aktifFirmaGorevler.length}`} tone="cyan"/>
        <Metric label="Devam Eden" value={`${aktifFirmaGorevler.filter(g=>g.durum==="DevamEdiyor").length}`} tone="amber"/>
        <Metric label="Tamamlanan" value={`${aktifFirmaGorevler.filter(g=>g.durum==="Tamamlandı").length}`} tone="emerald"/>
      </div>
      <Card>
        <DataTable rows={aktifFirmaGorevler} rowKey={r=>r.id} cols={[
          {h:"Görev",cell:r=><div><div className="font-medium text-white">{r.baslik}</div><div className="text-xs text-slate-500">{r.aciklama}</div></div>},
          {h:"Atanan",cell:r=>r.atananAd},
          {h:"Öncelik",cell:r=><Badge tone={r.oncelik==="Kritik"?"rose":r.oncelik==="Yüksek"?"amber":"slate"}>{r.oncelik}</Badge>},
          {h:"İlerleme",cell:r=><div className="w-20"><Progress value={r.ilerleme}/></div>},
          {h:"Bitiş",cell:r=>D.tarihFmt(r.bitis)},
          {h:"Durum",cell:r=><Badge tone={r.durum==="Tamamlandı"?"emerald":r.durum==="DevamEdiyor"?"cyan":"amber"}>{r.durum}</Badge>},
        ]}/>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RAPOR
// ═══════════════════════════════════════════════════════════════
function RaporContent({store,fbf,aktifFirmaFaturalari,aktifFirmaCarileri,aktifFirmaProjeler}:MainContentProps) {
  return (
    <div className="space-y-6">
      <PageHead title="Raporlama" sub="Dinamik rapor, grafik, Excel/PDF export" action={<div className="flex gap-2"><Btn>{icons.export("w-4 h-4")} Excel</Btn><GhostBtn onClick={()=>window.print()}>PDF</GhostBtn></div>}/>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-white mb-4">Satış Trendi</h3>
          <Spark values={aktifFirmaFaturalari.map(f=>f.genelToplam)} color="stroke-emerald-400"/>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/[0.03] p-3 text-center"><div className="text-xs text-slate-500">Toplam</div><div className="text-lg font-bold text-white">{D.paraFmt(aktifFirmaFaturalari.reduce((a,f)=>a+f.genelToplam,0))}</div></div>
            <div className="rounded-xl bg-white/[0.03] p-3 text-center"><div className="text-xs text-slate-500">Ortalama</div><div className="text-lg font-bold text-cyan-300">{D.paraFmt(aktifFirmaFaturalari.reduce((a,f)=>a+f.genelToplam,0)/Math.max(1,aktifFirmaFaturalari.length))}</div></div>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-4">Proje Karlılığı</h3>
          {aktifFirmaProjeler.map(p=>(
            <div key={p.id} className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">{p.ad}</span>
                <span className={p.kazanc.roi>=0?"text-emerald-300":"text-rose-300"}>ROI: {p.kazanc.roi.toFixed(1)}%</span>
              </div>
              <Progress value={p.kazanc.roi+100} max={200} tone={p.kazanc.roi>=0?"emerald":"rose"}/>
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <h3 className="font-semibold text-white mb-4">Cari Dağılım</h3>
        <div className="space-y-2">
          {aktifFirmaCarileri.map(c=>(
            <div key={c.id} className="flex items-center gap-3 text-sm">
              <span className="w-40 text-slate-300 truncate">{c.ad}</span>
              <div className="flex-1"><Progress value={Math.abs(c.bakiye)} max={Math.max(...aktifFirmaCarileri.map(x=>Math.abs(x.bakiye)))}/></div>
              <span className={cn("w-28 text-right font-medium",c.bakiye>=0?"text-emerald-300":"text-rose-300")}>{D.paraFmt(Math.abs(c.bakiye))}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AI
// ═══════════════════════════════════════════════════════════════
function AiContent({store,aktifFirma}:MainContentProps) {
  const moduller=[
    {baslik:"Banka Açıklama Analizi", aciklama:"Banka ekstre açıklamalarını AI ile analiz ederek otomatik cari eşleştirme.", icon:"🏦", durum:"Hazır"},
    {baslik:"Gider Kategori Önerisi", aciklama:"Fiş ve fatura açıklamalarından otomatik gider kategorisi tahmin eder.", icon:"📊", durum:"Hazır"},
    {baslik:"Şüpheli İşlem Tespiti", aciklama:"Anormal tutarlar, tekrarlayan desenleri tespit eder.", icon:"🔍", durum:"Hazır"},
    {baslik:"Nakit Akışı Tahmini", aciklama:"30-60-90 günlük nakit akışı projeksiyonu.", icon:"💰", durum:"Geliştiriliyor"},
    {baslik:"Satış Tahmini", aciklama:"Mevcut pipeline ve geçmiş performansa göre satış tahmini.", icon:"📈", durum:"Geliştiriliyor"},
    {baslik:"Karlılık Analizi", aciklama:"Ürün, müşteri ve kanal bazlı karlılık analizleri.", icon:"💎", durum:"Hazır"},
    {baslik:"Tahsilat Önerileri", aciklama:"Geciken alacakları önceliklendirir ve tahsilat stratejisi önerir.", icon:"📋", durum:"Hazır"},
    {baslik:"Günlük Yönetici Özeti", aciklama:"Her sabah firmaya özel finansal ve operasyonel özet.", icon:"📰", durum:"Hazır"},
    {baslik:"Otomatik Mutabakat", aciklama:"Banka ekstresi ile muhasebe kayıtlarını otomatik eşleştirir.", icon:"✅", durum:"Hazır"},
    {baslik:"Risk Analizi", aciklama:"Cari hesap risk skorlaması ve erken uyarı sistemi.", icon:"⚠️", durum:"Hazır"},
    {baslik:"ARGE Maliyet Analizi", aciklama:"ARGE projelerinin maliyet etkinliği ve başarı oranı.", icon:"🧪", durum:"Hazır"},
    {baslik:"Proje Maliyet Tahmini", aciklama:"AI destekli proje maliyet ve süre tahmini.", icon:"📉", durum:"Geliştiriliyor"},
  ];
  return (
    <div className="space-y-6">
      <PageHead title="AI Asistan" sub={`${aktifFirma.ad} için yapay zeka destekli analiz ve otomasyon modülleri`}/>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {moduller.map((m,i)=>(
          <Card key={i} className="hover:-translate-y-1 transition-all cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{m.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-white text-sm">{m.baslik}</h4>
                  <Badge tone={m.durum==="Hazır"?"emerald":"amber"}>{m.durum}</Badge>
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{m.aciklama}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FİŞ OKUMA
// ═══════════════════════════════════════════════════════════════
function FisOkumaContent({aktifFirmaFisleri,addToast}:MainContentProps) {
  const [tab,setTab]=useState("arsiv");
  return (
    <div className="space-y-6">
      <PageHead title="Fiş / Fatura Okuma" sub="Kamera, görsel yükleme ve AI+OCR ile otomatik işleme"/>
      <Tab tabs={[{key:"arsiv",label:"Fiş Arşivi"},{key:"yukle",label:"Yeni Fiş Tara"}]} active={tab} onChange={setTab}/>
      {tab==="arsiv"&&(
        <Card>
          <DataTable rows={aktifFirmaFisleri} rowKey={r=>r.id} cols={[
            {h:"Tarih",cell:r=>D.tarihFmt(r.tarih)},
            {h:"Firma",cell:r=><span className="font-medium text-white">{r.firmaAdi}</span>},
            {h:"Toplam",cell:r=><span className="font-bold text-white">{D.paraFmt(r.toplam,r.paraBirimi)}</span>},
            {h:"KDV",cell:r=>D.paraFmt(r.kdv,r.paraBirimi)},
            {h:"Kategori",cell:r=><Badge tone="cyan">{r.aiKategori}</Badge>},
            {h:"AI Güven",cell:r=>`%${r.aiGuven}`},
            {h:"Durum",cell:r=><Badge tone={r.durum==="Islendi"?"emerald":r.durum==="Hatalı"?"rose":"amber"}>{r.durum}</Badge>},
          ]}/>
        </Card>
      )}
      {tab==="yukle"&&(
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-white mb-4">📸 Fiş / Fatura Yükle</h3>
            <div className="rounded-2xl border-2 border-dashed border-white/[0.1] bg-white/[0.02] p-12 text-center">
              <div className="text-5xl mb-4">📄</div>
              <p className="text-sm text-slate-400 mb-4">Fiş veya fatura görselini sürükleyin ya da tıklayarak yükleyin</p>
              <Btn onClick={()=>addToast("Fiş tarandı ve işlendi — Akaryakıt ₺2.850")}>
                {icons.fis("w-4 h-4")} Örnek Fiş İşle
              </Btn>
              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-500">
                <div className="rounded-lg bg-white/[0.03] p-2">📱 Kamera</div>
                <div className="rounded-lg bg-white/[0.03] p-2">🖼️ Görsel</div>
                <div className="rounded-lg bg-white/[0.03] p-2">📄 PDF</div>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold text-white mb-4">🤖 AI OCR İşleme Akışı</h3>
            <div className="space-y-3">
              {["Fiş/fatura görseli yüklenir","AI + OCR metin çıkarır","Tarih, firma, tutar, KDV otomatik okunur","Gider kategorisi AI ile tahmin edilir","Muhasebe fişi otomatik oluşturulur","Dijital arşive kaydedilir"].map((s,i)=>(
                <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15 text-xs font-bold text-cyan-300">{i+1}</div>
                  <span className="text-sm text-slate-300">{s}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BOT YÖNETİMİ
// ═══════════════════════════════════════════════════════════════
function BotContent({store,aktifFirma}:MainContentProps) {
  const komutlar=[
    {komut:"500 TL yemek gideri", aciklama:"Gider kaydı oluşturur", ornek:"500 TL yemek gideri", kategori:"finans"},
    {komut:"Ahmet'e 1000 EUR ödeme", aciklama:"Cari bulur, kur çevirir", ornek:"1000 EUR ödeme", kategori:"finans"},
    {komut:"Bugün kasa durumu?", aciklama:"Kasa bakiyesini söyler", ornek:"Kasa durumu", kategori:"genel"},
    {komut:"Fatura gönder", aciklama:"E-fatura oluşturur", ornek:"FAT-2026-1847 gönder", kategori:"finans"},
    {komut:"Toplam Ciro ne?", aciklama:"Ciro raporu verir", ornek:"Toplam ciro", kategori:"genel"},
    {komut:"Yeni lead ekle", aciklama:"CRM lead oluşturur", ornek:"Koç Endüstri lead ekle", kategori:"cari"},
    {komut:"Stok kontrolü", aciklama:"Kritik stokları bildirir", ornek:"Stok kontrolü", kategori:"stok"},
    {komut:"Görev oluştur", aciklama:"Yeni görev atar", ornek:"Yeni görev oluştur", kategori:"proje"},
  ];
  return (
    <div className="space-y-6">
      <PageHead title="Bot Yönetimi" sub="WhatsApp / Telegram bot komutları ve otomasyon"/>
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20 text-3xl">🤖</div>
          <div>
            <h3 className="font-semibold text-white">WhatsApp / Telegram Bot</h3>
            <p className="text-sm text-slate-400">Bot üzerinden finansal işlemler yapabilir, fiş gönderebilir ve AI'dan bilgi alabilirsiniz.</p>
          </div>
          <Badge tone="emerald">Aktif</Badge>
        </div>
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 mb-6">
          <p className="text-sm text-green-200">Bot numarası: +90 532 *** ** **</p>
          <p className="text-xs text-green-200/60 mt-1">Kullanıcılar bu numaraya mesaj göndererek işlem yapabilir.</p>
        </div>
        <h4 className="font-semibold text-white mb-4">Bot Komutları</h4>
        <div className="grid gap-3 md:grid-cols-2">
          {komutlar.map((k,i)=>(
            <div key={i} className="rounded-xl bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 mb-1"><code className="text-sm font-mono text-cyan-300">{k.komut}</code><Badge tone="cyan">{k.kategori}</Badge></div>
              <p className="text-xs text-slate-400">{k.aciklama}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AYARLAR
// ═══════════════════════════════════════════════════════════════
function AyarContent({store,aktifFirma,aktifKullanici,aktifFirmaKullanicilari,aktifFirmaAuditleri}:MainContentProps) {
  const [tab,setTab]=useState("firma");
  return (
    <div className="space-y-6">
      <PageHead title="Ayarlar & Yönetim" sub="Firma, kullanıcı, yetki, güvenlik ve sistem ayarları"/>
      <Tab tabs={[{key:"firma",label:"Firma"},{key:"kullanici",label:"Kullanıcılar"},{key:"yetki",label:"Yetki Matrisi"},{key:"guvenlik",label:"Güvenlik"},{key:"entegrasyon",label:"Entegrasyon"}]} active={tab} onChange={setTab}/>

      {tab==="firma"&&(
        <Card>
          <h3 className="font-semibold text-white mb-4">Firma Bilgileri</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[["Firma Adı",aktifFirma.ad],["Ünvan",aktifFirma.unvan],["Vergi No",aktifFirma.vergiNo],["Vergi Dairesi",aktifFirma.vergiDairesi],["Telefon",aktifFirma.telefon],["Sektor",aktifFirma.sektor],["Paket",aktifFirma.paket],["Kullanıcı Limiti",`${aktifFirma.kullaniciLimiti} kullanıcı`],["Para Birimi",aktifFirma.paraBirimi],["Disk Limiti",`${aktifFirma.diskLimitiMB} MB`]].map(([l,v])=>(
              <div key={l} className="rounded-xl bg-white/[0.03] p-4"><div className="text-xs text-slate-500 mb-1">{l}</div><div className="font-medium text-white">{v}</div></div>
            ))}
          </div>
        </Card>
      )}

      {tab==="kullanici"&&(
        <Card>
          <DataTable rows={aktifFirmaKullanicilari} rowKey={r=>r.id} cols={[
            {h:"Kullanıcı",cell:r=><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-xs font-bold text-white">{r.avatar}</div><div><div className="font-medium text-white">{r.ad} {r.soyad}</div><div className="text-xs text-slate-500">{r.email}</div></div></div>},
            {h:"Rol",cell:r=><Badge tone="cyan">{r.rol}</Badge>},
            {h:"Departman",cell:r=>r.departman},
            {h:"2FA",cell:r=><Badge tone={r.twoFA?"emerald":"amber"}>{r.twoFA?"Aktif":"Kapalı"}</Badge>},
            {h:"Son Giriş",cell:r=>D.tarihSaatFmt(r.sonGiris)},
            {h:"Durum",cell:r=><Badge tone={r.status==="Aktif"?"emerald":"rose"}>{r.status}</Badge>},
          ]}/>
        </Card>
      )}

      {tab==="yetki"&&(
        <Card>
          <h3 className="font-semibold text-white mb-4">Rol Bazlı Yetki Matrisi</h3>
          <div className="space-y-3">
            {(Object.entries(D.rolePermissions) as [D.RolTipi,D.ModulKey[]][]).map(([r,mods])=>(
              <div key={r} className="rounded-xl bg-white/[0.03] p-4">
                <div className="flex items-center justify-between mb-3"><span className="font-medium text-white">{r}</span><Badge tone="cyan">{mods.length} modül</Badge></div>
                <div className="flex flex-wrap gap-1">{mods.map(m=><Badge key={m} tone="slate">{m}</Badge>)}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab==="guvenlik"&&(
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="font-semibold text-white mb-4">Güvenlik Ayarları</h3>
            <div className="space-y-3">
              {[["JWT & Refresh Token","Aktif","emerald"],["2FA Zorunlu","Opsiyonel","amber"],["Rate Limiting","500/dk","emerald"],["SQL Injection","Aktif","emerald"],["XSS Koruması","Aktif","emerald"],["Şifre Hashleme","bcrypt","emerald"],["Session Timeout","30 dk","emerald"],["Otomatik Yedekleme","Günlük","emerald"]].map(([l,v,t])=>(
                <div key={l} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3">
                  <span className="text-sm text-slate-300">{l}</span>
                  <Badge tone={t}>{v}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold text-white mb-4">Yedekleme</h3>
            <div className="space-y-3">
              {[["Son Yedek","10 Haz 2026 03:00","emerald"],["Yedek Boyutu","2.4 GB","cyan"],["Saklama","90 gün","amber"],["Otomatik","Günlük 03:00","emerald"]].map(([l,v,t])=>(
                <div key={l} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3">
                  <span className="text-sm text-slate-300">{l}</span>
                  <Badge tone={t}>{v}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab==="entegrasyon"&&(
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[["E-Fatura","GİB entegrasyonu","Hazır","🧾"],["E-Arşiv","E-Arşiv fatura","Hazır","📋"],["E-İrsaliye","Sevk irsaliyesi","Hazır","🚛"],["Banka API","Otomatik ekstre","Bağlantı","🏦"],["WhatsApp","Müşteri iletişimi","Hazır","💬"],["SMS API","Toplu bildirim","Hazır","📱"],["Stripe","Online ödeme","Hazır","💳"],["PayTR","Online ödeme","Hazır","💳"],["iyzico","Online ödeme","Hazır","💳"],["QR Tahsilat","QR ile ödeme","Hazır","📲"],["Webhook","Dış sistem","Aktif","🔗"],["Bot","WhatsApp/Telegram","Aktif","🤖"]].map(([ad,aciklama,durum,icon])=>(
            <Card key={ad}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="font-medium text-white text-sm">{ad}</div>
                  <div className="text-xs text-slate-500 mt-1">{aciklama}</div>
                  <Badge tone={durum==="Aktif"||durum==="Hazır"?"emerald":"amber"}>{durum}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}