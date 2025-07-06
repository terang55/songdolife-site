"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { generateBreadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';

interface AcademyItem {
  ACA_NM: string;          // 학원명
  REALM_SC_NM: string;     // 분야명
  LE_CRSE_NM: string;      // 교습과정명
  FA_RDNMA: string;        // 도로명주소
  FA_RDNDA: string;        // 상세주소
  FA_TELNO: string | null; // 전화번호
}

interface ApiResponse {
  success: boolean;
  total: number;
  data: AcademyItem[];
}

export default function AcademyPage() {
  const [academies, setAcademies] = useState<AcademyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [realm, setRealm] = useState<string>('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (realm) params.append('realm', realm);
      // dong 파라미터는 기본 송도동이므로 생략
      const res = await fetch(`/api/academy${params.size ? '?' + params.toString() : ''}`);
      const json: ApiResponse = await res.json();
      if (json.success) {
        let list = json.data;
        if (query) {
          const q = query.trim();
          list = list.filter((a) => a.ACA_NM.includes(q));
        }
        setAcademies(list);
      } else {
        setError('데이터를 가져오지 못했습니다');
      }
    } catch (err) {
      console.error(err);
      setError('API 호출 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realm]);

  const breadcrumbData = generateBreadcrumbSchema([
    { name: '홈', path: '/' },
    { name: '교육·학원', path: '/academy' }
  ]);

  const realmOptions = [
    '입시.검정 및 보습',
    '예능(대)',
    '국제화',
    '기타'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>송도동 학원 정보 | 송도라이프</title>
        <meta name="description" content="인천시 연수구 송도동 학원·교습소 정보를 과목별로 검색해 보세요." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      </Head>

      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900 dark:text-gray-100">🏙️ 인천논현라이프</Link>
          <nav className="space-x-4 text-sm">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200">홈</Link>
            <Link href="/realestate" className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200">부동산</Link>
            <Link href="/subway" className="hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200">교통</Link>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">학원</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">🎓 송도동 학원 정보</h1>

        {/* 검색 & 필터 */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="학원명 검색"
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <select
            value={realm}
            onChange={(e) => setRealm(e.target.value)}
            className="w-full sm:w-48 border rounded-lg px-2 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          >
            <option value="">전체 분야</option>
            {realmOptions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <button
            onClick={fetchData}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            검색
          </button>
        </div>

        {/* 목록 */}
        {loading && <p className="text-gray-600 dark:text-gray-300">로딩 중...</p>}
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        {!loading && academies.length === 0 && !error && (
          <p className="text-gray-600 dark:text-gray-300">해당 조건의 학원이 없습니다.</p>
        )}

        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {academies.map((a) => (
            <li key={a.ACA_NM} className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{a.ACA_NM}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">{a.REALM_SC_NM} · {a.LE_CRSE_NM}</p>
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-1">{a.FA_RDNMA} {a.FA_RDNDA}</p>
              {a.FA_TELNO && <p className="text-sm text-gray-700 dark:text-gray-200">☎ {a.FA_TELNO}</p>}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
} 