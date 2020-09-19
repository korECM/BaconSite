import { ReviewReportState, ShopReportState } from 'api/report';

{
  /* <div>
  <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(0)} selected={form.shopReport.type[0]}>
    폐업했어요
  </Button>
  <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(1)} selected={form.shopReport.type[1]}>
    주소가 틀려요
  </Button>
  <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(2)} selected={form.shopReport.type[2]}>
    가격이 틀려요
  </Button>
  </div>
  <div>
  <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(3)} selected={form.shopReport.type[3]}>
    메뉴가 틀려요
  </Button>
  <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(4)} selected={form.shopReport.type[4]}>
    영업일 틀려요
  </Button>
  <Button theme="gray" onClick={() => toggleShopReportButtonDispatch(5)} selected={form.shopReport.type[5]}>
    전화번호 틀려요
  </Button>
  </div> */
}

export function reportTypeToString(report: number) {
  switch (report) {
    case 0:
      return '폐업했어요';
    case 1:
      return '주소가 틀려요';
    case 2:
      return '가격이 틀려요';
    case 3:
      return '메뉴가 틀려요';
    case 4:
      return '영업일 틀려요';
    case 5:
      return '전화번호 틀려요';
  }
  return '';
}

export function shopReportStateToString(report: ShopReportState) {
  switch (report) {
    case ShopReportState.Issued:
      return '신고 접수됨';
    case ShopReportState.Confirmed:
      return '신고 확인 중';
    case ShopReportState.Done:
      return '신고 처리됨';
    case ShopReportState.Rejected:
      return '신고 보류';
  }
  return '';
}

export function reviewReportStateToString(report: ReviewReportState) {
  switch (report) {
    case ReviewReportState.Issued:
      return '신고 접수됨';
    case ReviewReportState.Done:
      return '신고 처리됨';
    case ReviewReportState.Rejected:
      return '신고 보류';
  }
  return '';
}
