<template>
  <div class="footer-box">
    <div class="left"></div>
    <div class="right">
      <div class="phone-wrap">
        <span class="consultation">{{$transform('login.consultation')}}</span>
        <div class="phone">
          <i class="phone-icon fas fa-phone fa-rotate-90"></i>
          <span>400-900-3691</span>
        </div>
      </div>
      <div class="link-wrap">
        <a class="link-text" href="" target="_blank">{{$transform('login.about_link.home')}}</a>
        <span>|</span>
        <a class="link-text" href="" target="_blank">{{$transform('login.about_link.management_software')}}</a>
        <span>|</span>
        <a class="link-text" href="" target="_blank">{{$transform('login.about_link.weChat_marketing')}}</a>
        <span>|</span>
        <a class="link-text" href="" target="_blank">{{$transform('login.about_link.jake_mode')}}</a>
        <span>|</span>
        <a class="link-text" href="" target="_blank">{{$transform('login.about_link.customer_analysis')}}</a>
        <span>|</span>
        <a class="link-text" href="" target="_blank">{{$transform('login.about_link.shareholder_dividend')}}</a>
        <span>|</span>
        <a class="link-text" href="" target="_blank">{{$transform('login.about_link.employee_dividends')}}</a>
        <span>|</span>
        <a class="link-text" href="" target="_blank">{{$transform('login.about_link.phone_guardian')}}</a>
        <i class="arrow el-icon-d-arrow-right"></i>
      </div>
      <div class="copyright">
        <p>{{$transform('login.copyright')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginFooter'
}
</script>

<style lang="scss" scoped>
  .footer-box {
    height: 150px;
    width: 100%;
    background: #f8f8f8;
    font-size: 12px;
    text-align: center;
    color: #666;

    .left {
      float: left;
      background: url(../../assets/img/ewm.jpg) no-repeat center;
      width: 101px;
      height: 98px;
      margin: 26px 0 0 15vw;
    }

    .right {
      float: right;
      margin: 26px 15vw 0 0;

      .phone-wrap {
        position: relative;
        margin-top: 5px;

        .consultation {
          position: absolute;
          right: 210px;
          font-weight: 700;
        }

        .phone {
          position: absolute;
          right: 0;
          top: -6px;
          background: #a8cef7;
          color: #fff;
          font-size: 22px;
          font-weight: 700;
          width: 170px;
          border-radius: 0 3px 3px 0;

          .phone-icon {
            background: #60a5f8;
            position: absolute;
            right: 170px;
            color: #fff;
            font-size: 20px;
            line-height: 20px;
            padding: 5px;
            border-radius: 0 0 3px 3px;
          }
        }
      }

      .link-wrap {
        margin: 45px 0 5px;

        .link-text {
          text-decoration: none;
          color: #666666;
        }

        span {
          margin: 0 15px;
        }

        .arrow {
          margin-left: 15px;
        }
      }

      .copyright {
        float: right;
      }
    }
  }

</style>
