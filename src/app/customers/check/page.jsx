import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  // idが存在しない場合は早期にリターンする
  if (!id) return [];
  
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
  );
  if (!res.ok) {
    // エラーハンドリングを強化
    console.error("Failed to fetch customer", res.status, res.statusText);
    return []; // エラー時は空の配列を返す
  }
  return res.json();
}

export default async function ReadPage({ query }) {
  const { id } = query;
  const customerInfo = await fetchCustomer(id);

  // ↓↓↓ ここからが重要な修正 ↓↓↓
  // customerInfoが存在しない、または配列が空の場合の表示を定義
  if (!customerInfo || customerInfo.length === 0) {
    return (
      <div>
        <div className="alert alert-error">指定された顧客は見つかりませんでした。</div>
        <button className="btn btn-outline btn-accent">
          <a href="/customers">一覧に戻る</a>
        </button>
      </div>
    );
  }
  // ↑↑↑ ここまでが重要な修正 ↑↑↑

  // この下のコードは、customerInfoにデータが確実に存在する場合のみ実行される
  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo[0]} />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}
