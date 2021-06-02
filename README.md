## 아주대학교 SW 캡스톤 디자인 - Team Nomad
### Title: Dutch Delivery

---

# frontend

## 프로젝트 소개

### 더치딜리버리란?

> 더치딜리버리는 <b>위치 기반 공동 배달 플랫폼</b>으로서, <br>
> 소비자들은 동일한 위치, 시간에 여러 사람과 같이 배달에 참여하여 부담되었던 <b>배달비와 최소 주문 금액 걱정 없이</b> 배달을 즐기고, <br>
> 점주는 여러 명의 주문을 한 번에 보내기 때문에 <b>기존보다 적은 수수료로 더 많은 배달 서비스</b>를 제공받으며, <br>
> 배달원은 저희가 새롭게 규정한 수수료 정책에 혜택을 받아 <b>노동에 비해 더 많은 수수료를</b> 얻어가는 배달 서비스를 제공해줍니다. <br>

### 개발 동기 및 목적

> 최근에 코로나 19로 인하여 외식이나 모임이 줄어들고 집에 있는 시간이 늘어남에 따라 <b>배달 서비스가 많이 이용되는 추세</b>이다. <br>
> 그에 따라 개인이 배달을 시키는 경우도 늘어나게 되었는데 기존의 서비스는 <b>최소주문금액이 높아 개인이 주문을 하지 못하는 경우</b> 가 생기고 최소주문금액을 맞추었더라도 <b>배달비가 추가되어 배달 서비스를 이용할 때 재정적 부담이 예상보다 커지는 경우</b> 가 많이 일어난다. <br>
> 또한 늘어나는 배달 수수료로 인하여 가게 점주들도 <b>배달 서비스를 사용하는데 경제적 부담</b> 을 가지고 있으며 <br>
> 배달 서비스의 사용이 늘어남에 따라 <b>배달원들의 전체 노동시간이 증가</b> 되고 있는 상황이다. <br><br>
> 이러한 여러 이해관계자들의 불편들을 해소하기 위하여 ‘더치딜리버리’라는 서비스를 개발하였다. <br>


### 기대효과

> 우리는 더치딜리버리를 통하여 기존의 배달 서비스에서 생긴 불편사항들을 해결하고자 하며 그로 인하여 배달 서비스가 더 활성화되는 것을 목표로 하고 있다.
![](img/memberOrder.png)
- memberOrderId: memberOrder 엔티티의 primary key
- storeId: 연관관계 매핑을 해놨지만 좀 더 간편하게 조회할 필요가 있어서 추가 등록
- totalCost: 주문 상품의 총 가격
- payMethod: 결제 장법
- orderTime: 주문 시간
- memberId: 사용자가 주문을 헀을 시, 사용자는 자신의 주문을 식별할 필요가 있기 때문에 memberOrder 엔티티와 member 엔티티간의 일대다 관계 매핑을 위한 foreign key
- storeId2: 사용자가 주문을 했을 시, 해당 매장에서도 주문을 식별할 필요가 있기 때문에 memberOrder 엔티티와 store 엔티티간의 일대다 관계 매핑을 위한 foreign key
- groupId: 사용자가 그룹에 참여했을 시, group 엔티티에서 그룹에 참여하고 있는 사용자들의 주문을 식별할 필요가 있기 때문에 memberOrder 엔티티와 group 엔티티 매핑을 위한 foreign key

### 개발 도구 및 버전
![](img/orderItem.png)
- orderItemId: orderItem 엔티티의 primary key
- cost: 주문 상품 가격
- menuName: 주문한 메뉴 이름
- quantity: 주문 수량
- memberId: 사용자에서 memberOrder를 통해서 식별하기 보다 member를 가지고 주문 상품을 식별하는게 더 편리하다고 판단하여 member 엔티티와 orderItem 엔티티 일대다 매핑을 위한 foreign key
- memberOrderId: memberOrder에서 주문한 상품을 식별할 수 있어야 하기 때문에 memberOrder 엔티티와 orderItem 엔티티 일대다 관계 매핑을 위한 foreign key


## API

POST `/member`: 회원가입<br>
GET `/member` : DB에 저장되어 있는 member 정보 중에 토큰을 조회해서 회원가입이 되어있는지 확인<br>
GET `/memberList` : 가입된 회원목록 조회<br>
GET `/memberOrderList` : 사용자의 주문내역 불러오기 (주문목록, 작성리뷰 포함)<br>

POST `/deliveryGroup` : 배달그룹 생성<br>
POST `/deliveryGroupJoin` : 그룹 참여<br>
POST `/deliveryGroupOrder` : 모집 완료된 주문 상태 변경(매장에서 접수)<br>
GET `/deliveryGroupOrder` : 모집 완료된 주문 불러오기 <br>
GET `/allGroupList` : 생성된 배달 그룹 전부 불러오기<br>
GET `/dailyGroupList` : 당일 모집 배달 그룹 전부 불러오기<br>
GET `/weeklyGroupList` : 주간 모집 배달 그룹 전부 불러오기<br>
GET `/deliveryComplete` : 배달 완료된 그룹 불러오기(매장 보관용) // 수정요망<br>

POST `/store` : 매장 생성<br>
GET `/storeList` : 배달 그룹 생성할 때, 전체 매장 불러오기(메뉴, 리뷰 포함)<br>
GET `/myStoreList` : 관리하는 매장 불러오기<br>

POST `/menu` : 메뉴 등록<br>
POST `/promotionMenu` : 프로모션 메뉴 등록<br>

POST `/likeStore` : 찜한 매장 등록<br>
GET `/likeStore` : 찜한 매장 불러오기<br>

POST `/chatId` : 채팅방을 위한 ChatToken 부여<br>
GET `/chatId` : 회원이 참여하고 있는 채팅방의 토큰들 불러오기<br>

POST `/review` : 사용자의 리뷰 작성<br>
GET `/memberReview` : 사용자 로그인 시, 사용자가 작성한 리뷰 불러오기<br>
GET `/storeReview` : 매장 로그인 시, 매장을 대상으로 작성된 리뷰 불러오기<br>

POST `/delivery` : 배달 접수하기(채팅방 생성 포함)<br>
POST `/deliveryComplete` : 배달 완료<br>
GET `/delivery` : 배달이 필요한 주문들 불러오기 (WaitingForDelivery 상태인 배달들) // 수정요망<br>
