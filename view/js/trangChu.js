$(document).ready(function () {
  $('[data-bs-toggle="collapse"]').on('click', function () {
    // Thêm mã JavaScript liên quan đến Bootstrap (nếu cần)
  });
});



var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider){
  $routeProvider
   .when('/', {
      templateUrl: 'home.html',

    })
   .when('/danhMuc', {
      templateUrl: 'danhMuc.html',
 
    })
    .when('/gioiThieu', {
      templateUrl: 'gioiThieu.html',

    })
    .when('/chiTietSanPham', {
      templateUrl: 'chiTietSanPham.html',

    })
    .when('/gioHang', {
      templateUrl: 'gioHang.html',

    })
    .when('/dangNhap', {
      templateUrl: 'login.html',

    })
    .when('/quenPass', {
      templateUrl: 'quenPass.html',

    })
    .when('/dangKy', {
      templateUrl: 'dangKy.html',

    })
   .otherwise({
    template: '404 - Không tìm thấy trang!'
    });
});
    
    
app.controller('myCtrl', function($scope,$filter,$rootScope,$http,$document, $location){
  $scope.limitDM = 3;
  $scope.pageDMDM = 1;
  $scope.selectedpageDMDM = 1;
  $scope.startDM = 0;
  $scope.currentSection = 0;
  $scope.soLuong= 0 ;
  $scope.dsDanhMuc = [];
  // sản phẩm mới 2024
  $scope.dsSP = [];
// load data
    // xử lý hinhsection
  // Đọc dữ liệu từ file data.json
  $http.get('data.json')
  .then(function(response) {
    $scope.dsDanhMuc = response.data;
    $scope.totalPagesDM = Math.ceil($scope.dsDanhMuc.length / $scope.limitDM);

    $scope.prevPage = function() {
      if ($scope.pageDMDM > 1) {
        $scope.pageDMDM--;
        $scope.updateDisplayedCategories();
      }
    };

    $scope.nextPage = function() {
      if ($scope.pageDMDM < $scope.totalPagesDM) {
        $scope.pageDMDM++;
        $scope.updateDisplayedCategories();
      }
    };

    $scope.updateDisplayedCategories = function() {
      $scope.startDM = ($scope.pageDMDM - 1) * $scope.limitDM;
      $scope.displayedCategories = $scope.dsDanhMuc.slice($scope.startDM, $scope.startDM + $scope.limitDM);
    };
  })
  .catch(function(error) {
  // Thông báo lỗi nếu không đọc được dữ liệu
  console.error('Không thể đọc dữ liệu từ file data.json:', error);
  alert('Không thể đọc dữ liệu từ file data.json. Vui lòng kiểm tra file và thử lại.') 
  });
  $http.get('dataSanPham.json')
  .then(function(response) {
    $scope.dsSP = response.data;

  })
  .catch(function(error) {
  // Thông báo lỗi nếu không đọc được dữ liệu
  console.error('Không thể đọc dữ liệu từ file data.json:', error);
  alert('Không thể đọc dữ liệu từ file data.json. Vui lòng kiểm tra file và thử lại.') 
  });
    $rootScope.cart = [];
    $scope.limit = 8;
    $scope.page = 1;
    $scope.selectedPage = 1;
    $scope.start = 0;
   
    // thay đổi danh mục 
    $scope.loaiDM =  [];
    $scope.loadDM = function(dm) {
      $scope.currentDanhMuc = dm.tenDanhMuc;
      $scope.hinhDM  = dm.hinhAnh;
      $scope.selectedPage = 1;
      $scope.start = 0;
      $scope.loaiDM = $filter('filter')($scope.dsSP, { loaiSP: $scope.currentDanhMuc });
    console.log($scope.currentDanhMuc)
    
    }
    $scope.getTotalPages = function() {
      $scope.tongSoTrang = Math.ceil($scope.loaiDM.length / $scope.limit);
      var pages = [];
      for (var i = 1; i <= $scope.tongSoTrang; i++) {
        pages.push(i);
      }

      return pages;
    };
    
    $scope.phanTrang = function(pageNum) {
      $scope.selectedPage = pageNum;
      $scope.start = ($scope.selectedPage - 1) * $scope.limitDM;
    };
    
    $scope.trangTruoc = function() {
      if ($scope.selectedPage > 1) {
        $scope.selectedPage--;
        $scope.start = ($scope.selectedPage - 1) * $scope.limitDM;
      }
    };
    
    $scope.trangSau = function() {
      if ($scope.selectedPage < $scope.tongSoTrang) {
        $scope.selectedPage++;
        $scope.start = ($scope.selectedPage - 1) * $scope.limitDM;
      }
    };
   
$scope.giaTang = function() {

    $scope.loaiDM = $filter('orderBy')($scope.loaiDM, 'giaBan', true);

};
$scope.giaGiam = function() {

    $scope.loaiDM = $filter('orderBy')($scope.loaiDM, '-giaBan', true);
  
};

    $scope.activeSection = 0;
    $scope.showLargeImage = function(sectionId) {
      $scope.activeSection = sectionId;
    };
    $scope.giaBan = 0;
    $scope.giaGoc = 0;
    $scope.vitri ;
  
    $scope.loadSanPham = function(sp) {
      $scope.sanPham = sp;
      $scope.tenSanPham = sp.tenSanPham;
      $scope.giaBan = sp.giaBan;
      $scope.giaGoc = $scope.giaBan + 100000;
      $scope.id = sp.id;
      
      // Tìm vị trí của sản phẩm trong mảng dsSP
      for (var i = 0; i < $scope.dsSP.length; i++) {
        if ($scope.dsSP[i].id === $scope.id) {
          $scope.vitri = i;
          break;
        }
      } 
   
    };
  
    $scope.selectedColor = null; // Khởi tạo biến selectedColor

    $scope.setSelectedColor = function(color) {
      $scope.selectedColor = color;
    }
    $scope.selectedSize = null; // Khởi tạo biến selectedSize

$scope.setSelectedSize = function(size) {
  $scope.selectedSize = size;
}
$scope.quantity = 1; // Khởi tạo số lượng ban đầu là 1

$scope.decreaseQuantity = function() {
  if ($scope.quantity > 1) {
    $scope.quantity--;
  }
};

$scope.increaseQuantity = function() {
  if ($scope.quantity < 99) {
    $scope.quantity++;
  }
};
$scope.totalPrice = 0;
$scope.selectedColor = null;
$scope.selectedSize = null;
$scope.themVaoGioHang = function() {
  $scope.tenSP = $scope.dsSP[$scope.vitri].tenSanPham;
  $scope.giaSP = $scope.dsSP[$scope.vitri].giaBan;
  $scope.hinhAnh = $scope.dsSP[$scope.vitri].hinhAnh[0];

  if ($scope.selectedColor === null || $scope.selectedSize === null) {
    alert("Vui lòng chọn cả màu sắc và kích thước trước khi thêm vào giỏ hàng");
    return;
  }

  $scope.sanPham = {
    id: $scope.dsSP[$scope.vitri].id,
    tenSP: $scope.tenSP,
    giaSP: $scope.giaSP,
    hinhAnh: $scope.hinhAnh,
    color: $scope.selectedColor,
    size: $scope.selectedSize,
    quantity: $scope.quantity
  };



  var kiemTra = false;
  for (var i = 0; i < $rootScope.cart.length; i++) {
    if ($rootScope.cart[i].id === $scope.sanPham.id) {
      kiemTra = true;
      $rootScope.cart[i].quantity += $scope.sanPham.quantity;
      updateTotalPrice(); // Cập nhật tổng tiền
      break;
    }
  }

  if (kiemTra === false) {
    $rootScope.cart.push($scope.sanPham);
    updateTotalPrice(); // Cập nhật tổng tiền
    $scope.soLuong++;
  }

  // Lưu giỏ hàng vào LocalStorage

};

$scope.xoaSanPham = function(index) {
  // Xóa sản phẩm khỏi giỏ hàng
  $scope.cart.splice(index, 1);
  $scope.soLuong--;
  updateTotalPrice(); // Cập nhật tổng tiền
  // Lưu giỏ hàng mới vào LocalStorage

};
function updateTotalPrice() {
  $scope.totalPrice = 0;
  for (var i = 0; i < $rootScope.cart.length; i++) {
    $scope.totalPrice += $rootScope.cart[i].giaSP * $rootScope.cart[i].quantity;
  }
}
$scope.updateQuantity = function(item, delta) {
  item.quantity += delta;
  if (item.quantity < 1) {
    item.quantity = 1;
  }
  updateTotalPrice() 
}
// login
$scope.users = [
  {
    SDT: '0909090909',
    matKhau: '123',
    diaChi: '123 tô ký'
  },
  {
    SDT: '0909084423',
    matKhau: 'khoik7123',
    diaChi: '123 tô ký'
  }
];
$scope.checkDangNhap = false;
$scope.loginFailed = false;
$scope.userVIP = {};
$scope.login = function() {
  $scope.loginFailed = true;
  var phoneNumber = angular.element($document[0].getElementById('loginPhone')).val();
  var password = angular.element($document[0].getElementById('loginPassword')).val();

  for (var i = 0; i < $scope.users.length; i++) {
    if ($scope.users[i].SDT === phoneNumber && $scope.users[i].matKhau === password) {
            $scope.userVIP = $scope.users[i];
            alert('đăng nhập thành công')
            $scope.checkDangNhap = true;
            $location.path('/gioHang');
            $scope.loginFailed = false;
 
      break;
    }
  }
  
};

$scope.registerError = ''; 

$scope.dangKy = function() {
  var registerPhone = angular.element($document[0].getElementById('registerPhone')).val();
  var registerPassword = angular.element($document[0].getElementById('registerPassword')).val();
  var confirmPassword = angular.element($document[0].getElementById('confirmPassword')).val();
  var registerAddress = angular.element($document[0].getElementById('registerAddress')).val();

  var existingUser = $scope.users.find(function(user) {
    return user.SDT === registerPhone;
  });

  if (existingUser) {

    $scope.registerError = 'Số điện thoại đã được đăng ký.';

  } else if (registerPassword !== confirmPassword) {

    $scope.registerError = 'Mật khẩu không khớp.';
  } else {

    $scope.users.push({
      SDT: registerPhone,
      matKhau: registerPassword,
      diaChi: registerAddress
    });
    $scope.registerError = '';
    alert('đăng ký thành công')
    $scope.registerPhone = '';
    $scope.registerPassword = '';
    $scope.confirmPassword = '';
    $scope.registerAddress = '';
   
 


    $location.path('/dangNhap');
  }

};
$scope.thanhToan =  function(){
  alert('thanh toán thành công')
  $rootScope.cart = [];
  $scope.soLuong = 0;
  $location.path('/');
}
$scope.dangNhapThanhToan =  function(){
 

  $location.path('/dangNhap');
}



  });

 
  

  