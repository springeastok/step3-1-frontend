import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";

// ページコンポーネントをasync関数にする
export default async function ConfirmPage({ searchParams }) {
  // propsからcustomer_idを取得
  const customer_id = searchParams.customer_id;

  // サーバーサイドで直接データをフェッチ
  const customer = await fetchCustomer(customer_id);

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-success p-4 text-center">
          正常に作成しました
        </div>
        <OneCustomerInfoCard {...customer} />
        
        {/*
          注意：この方法ではuseRouter()やonClickが使えないため、
          ボタンはNext.jsのLinkコンポーネントを使った単純なページ遷移などに変更する必要があります。
        */}
        <a href="/customers" className="btn btn-primary m-4 text-2xl">
          戻る
        </a>
      </div>
    </>
  );
}
