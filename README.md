## 아주대학교 SW 캡스톤 디자인 - Team Nomad
### Title: Dutch Delivery

---

# frontend

## 프로젝트 소개

### 프로젝트 개발 동기 및 목적
![데이터베이스 개요](img/1.png)

[데이터베이스 사이트 바로가기](https://www.erdcloud.com/d/7AzuwXxHN6HnoKKhc)

### 프로젝트 기술 스택

#### 사용자
![](img/member1.png)
- memberId: member 엔티티의 primary Key
- groupId: 사용자가 그룹에 참여했을시, member 엔티티와 group 엔티티의 일대다 관계 매핑을 위한 foreign key
- email: 사용자 이메일
- nickName: 사용자가 사용할 닉네임
- token: Firebase cloud messaging을 위한 토큰 값
- uid: 파이어베이스와 같이 연동해서 사용하기 위한 사용자 uid
- point: 취소, 주문 이동에 유연하게 대처하기 위한 포인트
- memberType: 사용자, 매장, 배달원을 구분하기 위한 타입값
- shopIdNumber: 매장 가입시 필요한 사업자 번호
- deliIdNumber: 배달원 가입시 필요 운전면허번호

### 프로젝트 기대효과 및 활용 방안
![](img/memberOrder.png)
- memberOrderId: memberOrder 엔티티의 primary key
- storeId: 연관관계 매핑을 해놨지만 좀 더 간편하게 조회할 필요가 있어서 추가 등록
- totalCost: 주문 상품의 총 가격
- payMethod: 결제 장법
- orderTime: 주문 시간
- memberId: 사용자가 주문을 헀을 시, 사용자는 자신의 주문을 식별할 필요가 있기 때문에 memberOrder 엔티티와 member 엔티티간의 일대다 관계 매핑을 위한 foreign key
- storeId2: 사용자가 주문을 했을 시, 해당 매장에서도 주문을 식별할 필요가 있기 때문에 memberOrder 엔티티와 store 엔티티간의 일대다 관계 매핑을 위한 foreign key
- groupId: 사용자가 그룹에 참여했을 시, group 엔티티에서 그룹에 참여하고 있는 사용자들의 주문을 식별할 필요가 있기 때문에 memberOrder 엔티티와 group 엔티티 매핑을 위한 foreign key

### 프로젝트 개발 도구 및 버전
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
