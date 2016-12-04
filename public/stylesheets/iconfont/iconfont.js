;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-bofang" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0zM512 960c-247.424 0-448-200.576-448-448s200.576-448 448-448 448 200.576 448 448S759.424 960 512 960z"  ></path>'+
      ''+
      '<path d="M384 256 768 512 384 768Z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-yonghu" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M886.122496 343.892992c-19.600384-46.339072-47.657984-87.955456-83.393536-123.692032-35.735552-35.736576-77.35296-63.794176-123.692032-83.39456-47.978496-20.293632-98.941952-30.582784-151.474176-30.582784S424.068096 116.512768 376.088576 136.8064c-46.339072 19.600384-87.95648 47.657984-123.692032 83.39456-35.736576 35.736576-63.794176 77.35296-83.39456 123.692032-20.293632 47.978496-30.582784 98.941952-30.582784 151.473152 0 52.532224 10.289152 103.494656 30.582784 151.474176 19.600384 46.340096 47.657984 87.95648 83.39456 123.693056 35.736576 35.735552 77.35296 63.794176 123.692032 83.393536 47.978496 20.292608 98.941952 30.582784 151.473152 30.582784 52.532224 0 103.494656-10.290176 151.474176-30.582784 46.339072-19.600384 87.95648-47.657984 123.692032-83.393536 35.735552-35.736576 63.794176-77.35296 83.393536-123.693056 20.293632-47.978496 30.582784-98.941952 30.582784-151.474176C916.706304 442.835968 906.417152 391.872512 886.122496 343.892992zM528.272384 540.619776c-76.186624 0-138.169344-61.988864-138.169344-138.18368 0-76.186624 61.98272-138.169344 138.169344-138.169344 76.201984 0 138.195968 61.98272 138.195968 138.169344C666.468352 478.630912 604.474368 540.619776 528.272384 540.619776zM379.179008 631.559168c42.591232-33.833984 93.924352-51.718144 148.448256-51.718144 54.448128 0 105.723904 17.845248 148.284416 51.605504 40.572928 32.186368 69.922816 77.190144 82.871296 126.974976-28.29312 24.926208-60.205056 44.991488-94.906368 59.667456-43.153408 18.254848-89.01632 27.510784-136.313856 27.510784-47.29856 0-93.161472-9.254912-136.315904-27.50976-34.659328-14.659584-66.548736-34.706432-94.826496-59.603968C309.351424 708.733952 338.655232 663.75168 379.179008 631.559168zM700.096512 600.961024c-24.019968-19.054592-50.792448-33.895424-79.571968-44.1088-1.149952-0.408576-2.315264-0.813056-3.492864-1.211392 24.554496-14.267392 45.398016-34.250752 60.745728-58.35264 18.05824-28.357632 27.602944-61.156352 27.602944-94.851072 0-97.644544-79.451136-177.084416-177.110016-177.084416-97.644544 0-177.084416 79.439872-177.084416 177.084416 0 33.595392 9.49248 66.311168 27.449344 94.613504 15.254528 24.042496 35.982336 44.010496 60.407808 58.307584-1.48992 0.499712-2.968576 1.010688-4.431872 1.53088-28.813312 10.237952-55.607296 25.109504-79.638528 44.199936-40.884224 32.478208-72.508416 77.074432-89.737216 126.314496-25.276416-28.511232-45.574144-60.672-60.398592-95.720448-18.253824-43.15648-27.508736-89.019392-27.508736-136.31488 0-47.296512 9.255936-93.160448 27.508736-136.31488 17.639424-41.7024 42.896384-79.161344 75.071488-111.335424 32.177152-32.176128 69.635072-57.434112 111.335424-75.071488 43.15648-18.253824 89.020416-27.508736 136.315904-27.508736 47.296512 0 93.159424 9.255936 136.313856 27.508736 41.705472 17.639424 79.164416 42.897408 111.337472 75.071488 32.173056 32.173056 57.43104 69.632 75.071488 111.335424 18.2528 43.155456 27.508736 89.018368 27.508736 136.31488 0 47.297536-9.254912 93.161472-27.50976 136.315904-14.80704 35.014656-35.081216 67.1488-60.326912 95.6416C772.701184 678.047744 741.036032 633.43616 700.096512 600.961024z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-feiyong" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M763.274884 606.311992c-0.042979 0-0.082888 0.01228-0.125867 0.01228L545.855062 606.324272l0-95.595218 217.420845 0c14.239306 0 25.7822-11.543917 25.7822-25.7822 0-14.239306-11.542894-25.7822-25.7822-25.7822L580.610634 459.164654l22.950711-38.359656-0.309038 0.101307 129.454374-211.093742c9.357112-15.259542 4.573155-35.215036-10.685363-44.572148-15.259542-9.357112-35.214013-4.573155-44.572148 10.685363L512 445.713294 346.550831 175.925778c-9.357112-15.258519-29.312606-20.042475-44.572148-10.685363-15.258519 9.357112-20.043499 29.313629-10.685363 44.572148l152.916738 249.352091L260.724093 459.164654c-14.239306 0-25.7822 11.542894-25.7822 25.7822 0 14.239306 11.543917 25.7822 25.7822 25.7822l217.416751 0 0 95.595218L260.84996 606.324272c-0.042979 0-0.082888-0.01228-0.125867-0.01228-14.239306 0-25.7822 11.542894-25.7822 25.7822 0 14.239306 11.543917 25.7822 25.7822 25.7822l0 0.017396 217.416751 0 0 171.794691c0 18.698874 15.158235 33.857109 33.857109 33.857109 18.698874 0 33.857109-15.158235 33.857109-33.857109L545.855062 657.894811l217.420845 0 0-0.017396c14.239306 0 25.7822-11.543917 25.7822-25.7822C789.058107 617.854886 777.515213 606.311992 763.274884 606.311992z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-mima" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M521.939373 555.506886c-41.249473 0-74.679863 33.429367-74.679863 74.679863 0 29.720905 17.511839 55.17974 42.674938 67.188238l0 82.138742c0 17.659195 14.34573 32.005948 32.004925 32.005948 17.659195 0 32.005948-14.346753 32.005948-32.005948l0-82.140789c25.162076-12.009522 42.674938-37.46631 42.674938-67.187215C596.620259 588.936253 563.188846 555.506886 521.939373 555.506886zM831.296093 406.177859l-640.016629 0c-35.352159 0-64.011896 28.626991-64.011896 63.980173l0 426.676729c0 35.352159 28.659737 64.011896 64.011896 64.011896l640.016629 0c35.31839 0 63.978127-28.659737 63.978127-64.011896L895.27422 470.158033C895.275243 434.805874 866.615507 406.177859 831.296093 406.177859zM831.296093 854.160847c0 35.352159-7.321756 42.674938-42.674938 42.674938L233.919611 896.835785c-35.351136 0-42.640146-7.321756-42.640146-42.674938L191.279465 512.832971c0-35.352159 7.28901-42.674938 42.640146-42.674938l554.701544 0c35.352159 0 42.674938 7.321756 42.674938 42.674938L831.296093 854.160847zM208.867028 373.975437c17.768689 0 32.218796-14.161534 32.705889-31.812543l0.067538 0.004093c28.92375-122.258485 138.525983-213.338876 269.63095-213.338876 102.480023 0 191.682647 55.771211 239.628636 138.475841 4.988618 11.293207 16.279778 19.177781 29.41903 19.177781 17.758456 0 32.154327-14.395872 32.154327-32.154327 0-6.928806-2.199085-13.33982-5.925966-18.58938-58.985416-102.048187-168.918177-170.922834-295.276027-170.922834-165.111478 0-302.614156 113.305579-334.272179 268.980127-0.149403 0.641613-0.280386 1.289366-0.391926 1.945305-0.153496 0.778736-0.321318 1.551332-0.469698 2.332115l0.154519 0.00921c-0.100284 1.040702-0.154519 2.094708-0.154519 3.162016C176.136579 359.321692 190.790324 373.975437 208.867028 373.975437z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-xyfanhui01" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M287.183721 496.610498c43.61024-39.609113 276.479939-267.378653 320.091202-306.971393 17.963117-16.273638 44.721551 10.18906 26.693965 26.561959-38.798655 35.228339-266.887466 258.628362-305.689191 293.872051 38.997176 36.44812 267.271206 261.123182 306.284755 297.611212 17.763572 16.604166-8.997931 43.094494-26.726711 26.52512-43.793412-40.96397-276.859585-270.104741-320.654021-311.056432C279.932574 516.340865 279.748379 503.341806 287.183721 496.610498L287.183721 496.610498zM287.183721 496.610498"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-dianbo" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M993.85344 524.43136c0 264.97024-214.79424 479.82592-479.82592 479.82592S34.24256 789.4016 34.24256 524.43136c0-264.99072 214.77376-479.82592 479.80544-479.82592S993.85344 259.44064 993.85344 524.43136"  ></path>'+
      ''+
      '<path d="M512 0C229.1712 0 0 229.23264 0 512c0 282.76736 229.1712 512 512 512 282.76736 0 512-229.23264 512-512C1024 229.23264 794.76736 0 512 0M512 968.06912C260.096 968.06912 55.9104 763.86304 55.9104 512 55.9104 260.13696 260.096 55.93088 512 55.93088c251.86304 0 456.06912 204.20608 456.06912 456.06912C968.06912 763.86304 763.86304 968.06912 512 968.06912"  ></path>'+
      ''+
      '<path d="M383.26272 315.31008 383.26272 708.68992 710.12352 512Z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-xihuan" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M704.004477 124.640742c-74.442456 0-148.627039 33.120328-196.407252 87.968517-47.745421-54.848189-113.125477-87.968517-187.593516-87.968517-139.306766 0-252.630764 111.132076-252.630764 247.720941 0 222.305085 206.957539 361.722368 343.891258 453.981608 34.504862 23.232121 56.45478 37.229926 78.723969 55.406914l17.609053 17.609053 17.609053-17.609053c22.251793-18.176988 53.032844-32.17377 87.528496-55.42431 136.951115-92.240821 343.891258-231.6755 343.891258-453.963189C956.626032 235.772818 843.293847 124.640742 704.004477 124.640742z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-iconfontzan-copy" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M152.114466 196.170868c40.817638-38.527478 95.198176-62.377676 151.21498-66.153676 44.539402-3.442402 89.914846 5.972015 129.672338 26.193569 30.250978 15.049764 56.613392 37.021172 78.676897 62.489216 23.86964-27.533077 52.817949-51.103912 86.231967-66.024739 23.606651-11.775184 49.5403-17.952884 75.514881-21.784142 62.156642-7.198959 126.974903 9.822716 176.85187 47.774073 58.417481 43.011606 96.03524 113.052822 98.974176 185.607278 3.942799 79.771835-22.51069 159.209048-67.905576 224.357837-30.845519 45.113477-69.729108 84.107583-110.974487 119.695103-56.891731 48.516993-119.513978 89.558735-181.391257 131.267673-26.752294 17.541515-52.29504 36.796044-77.30055 56.721863-26.37981-21.1149-53.524031-41.243333-81.783655-59.754942-66.491367-44.797275-133.895523-89.001033-193.503109-142.912897C180.579775 643.675972 130.683365 584.853261 101.585653 515.1262c-12.20395-28.871561-20.50194-59.381435-24.780383-90.412173-3.758604-29.877471-4.762467-60.405765 0.521886-90.153276C86.181825 281.895275 113.007797 232.503355 152.114466 196.170868zM265.340227 175.074388c-64.12753 17.134239-118.30443 67.103304-140.684136 129.574101-16.539698 43.288922-15.404852 91.231841-6.474458 136.101771 12.222369 60.666708 43.440371 116.122741 83.234703 162.986071 59.589167 69.855998 134.788869 123.862006 210.525808 174.761256 33.450856 22.86373 67.774593 44.553729 99.736539 69.50091 32.706913-25.502837 67.849294-47.660486 102.06456-71.063499 56.090483-37.858236 111.697965-77.05598 160.90876-123.712603 49.242518-46.193065 92.704378-100.589976 116.628254-164.342975 16.446577-44.314275 23.944342-92.461855 18.492166-139.54622-8.483208-68.739571-53.91391-131.321908-116.425639-160.993694-41.96988-20.35356-90.990341-26.306132-136.49779-15.757892-32.891108 7.143701-63.962777 22.547529-89.543386 44.407396-22.547529 18.044982-38.081317 42.675962-55.625902 65.224514-9.357112-12.373819-18.695804-24.743544-27.998681-37.152155-25.935696-31.830963-61.226456-56.256258-100.648304-68.051909C345.096712 164.897607 303.665091 164.396187 265.340227 175.074388z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-weizhi1" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M629.735983 387.072733c0-64.916499-53.631478-117.537973-119.783107-117.537973S390.169769 322.156234 390.169769 387.072733c0 64.897056 53.631478 117.51853 119.783107 117.51853S629.735983 451.969788 629.735983 387.072733zM421.495218 388.868635c0-47.924499 39.615253-86.791715 88.456634-86.791715 48.859801 0 88.456634 38.867216 88.456634 86.791715s-39.596833 86.791715-88.456634 86.791715C461.111494 475.66035 421.495218 436.793134 421.495218 388.868635zM509.952876 812.853046c0 0 287.452851-285.974174 287.452851-427.708222 0-141.752468-128.708384-256.632915-287.452851-256.632915-158.743444 0-287.452851 114.880447-287.452851 256.632915C222.500025 526.878872 509.952876 812.853046 509.952876 812.853046zM509.952876 161.41018c138.383744 0 250.588245 101.631702 250.588245 227.009224 0 125.396965-250.588245 378.38077-250.588245 378.38077S259.364631 513.816369 259.364631 388.419404C259.364631 263.041882 371.568109 161.41018 509.952876 161.41018zM679.437965 740.02025l-24.813129 23.953551c16.242939 10.143011 25.860994 21.463848 25.860994 32.374338 0 30.894637-73.748654 65.422012-172.460864 65.422012-98.711186 0-172.460864-34.526351-172.460864-65.422012 0-11.902074 11.153014-24.327058 30.334889-35.161824l-22.493294-25.618471c-26.273387 16.504906-41.712007 37.409005-41.712007 60.742433 0 56.233746 88.681762 98.656951 206.331275 98.656951 117.631094 0 206.332299-42.404786 206.332299-98.656951C714.319403 775.070534 701.594591 755.778142 679.437965 740.02025z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-home" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M872.908328 459.82878l-290.731524-302.373679c-18.069541-18.760273-42.208311-29.104875-68.100004-29.104875-25.867134 0-50.030463 10.344602-68.088748 29.104875l-290.731524 302.373679c-30.005384 31.223119-26.136264 58.189284-21.180392 69.468165 3.530406 7.996115 15.464203 29.959336 49.842175 29.959336l42.6074 0 0 232.625128c0 52.78725 37.965683 102.537328 91.911316 102.537328l48.894593 0 74.857918 0 0-54.657854L442.189539 648.233777c0-26.394137-3.998057-41.098024 22.980387-41.098024l48.907896 0 48.919153 0c26.978445 0 22.968108 14.703887 22.968108 41.098024l0 191.527105 0 54.657854 74.857918 0 48.919153 0c53.93233 0 91.886757-49.750077 91.886757-102.537328L801.628912 559.25628l42.61968 0c34.376948 0 46.311769-21.963221 49.842175-29.959336C899.057895 518.018064 902.915759 491.050876 872.908328 459.82878zM844.248591 511.39011l-36.69269 0-24.452925 0-29.398564 0 0 280.491299c0 26.371624-17.008372 54.657854-43.962258 54.657854L633.890606 846.539262 633.890606 648.233777c0-52.79953-16.938788-88.977497-70.894653-88.977497l-48.919153 0-48.907896 0c-53.956889 0-70.89363 36.177967-70.89363 88.977497l0 198.305485-75.839269 0c-26.967188 0-43.986817-28.287253-43.986817-54.657854L274.449187 511.39011l-29.386284 0-24.453948 0-36.691667 0c-0.841158 0-1.612731-3.308349-2.313695-3.355421 1.659803-2.886747 4.51278-10.227945 9.269108-15.160281l290.75506-302.175157c8.6848-9.04705 20.946055-14.575973 32.832779-14.470573 11.887748-0.105401 23.403013 5.423523 32.077579 14.470573L837.303412 492.874407c4.747117 4.932336 7.599072 12.273535 9.257851 15.160281C845.861322 508.081761 845.101006 511.39011 844.248591 511.39011z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-youxiang" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M999.052818 148.770302l0 545.92567c0 5.447059-0.654916 10.864442-1.755993 16.19996-0.005117 0.024559-0.010233 0.048095-0.01535 0.072655-0.060375 0.296759-0.122797 0.593518-0.184195 0.890276-7.77815 37.140898-40.614 63.690578-78.561263 63.690578L121.942283 775.549441c-27.90556 0-54.733579-11.593036-73.253374-32.468482-0.525979-0.592494-1.046842-1.193175-1.563612-1.801019-1.281179-1.508353-2.499937-3.045359-3.66139-4.611018-11.632945-15.685237-17.637706-34.837436-17.637706-54.366212L25.826202 163.644057c0-30.839379 20.009729-58.208726 49.479925-67.296709 0.242524-0.074701 0.485047-0.148379 0.728594-0.222057 0.065492-0.019443 0.130983-0.039909 0.196475-0.059352 11.293207-3.384074 23.052019-4.948709 34.841529-4.948709 279.856849 0 559.713698 0 839.570547 0 1.286296 0.484024 2.534729 1.194198 3.864004 1.418302 24.204262 4.082992 38.524408 18.160615 43.014676 42.293245 0.00307 0.016373 0.00614 0.031722 0.00921 0.048095C998.408135 139.467425 999.052818 144.097886 999.052818 148.770302zM512.438998 501.06188c142.642744-120.048143 284.940634-239.805668 428.661943-360.761484-62.86784-3.666506-844.296175-1.51347-853.212242 2.408863C229.372038 262.133186 370.676297 381.403616 512.438998 501.06188zM639.598096 458.158744c-36.509519 30.772864-72.434729 61.069891-108.379383 91.342358-13.062504 11.000542-24.362874 11.08036-37.256532 0.230244-15.321964-12.892635-30.581506-25.858948-45.87891-38.780235-20.146852-17.017582-40.304961-34.023908-60.690244-51.230802-95.138824 88.196715-189.837626 175.98513-284.536428 263.774569 0.328481 0.733711 0.656963 1.467421 0.986467 2.200108 276.178063 0 552.35715 0 829.995471 0C835.498812 636.280538 737.872331 547.514865 639.598096 458.158744zM349.922624 428.010097C257.971399 350.322737 166.984129 273.450952 74.972529 195.712427c0 162.924673 0 324.175217 0 487.147986C167.17344 597.398995 258.216993 513.011027 349.922624 428.010097zM677.213809 426.472068c91.151 82.864266 181.439352 164.942633 272.816502 248.012583 0-160.114674 0-318.132594 0-477.850226C858.704326 273.572726 768.470209 349.592097 677.213809 426.472068z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-denglu" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M736.8 653.6c0 0-124.8-37.6-141.6-60.8L595.2 515.2c0 0 36.8-34.4 36.8-88.8 0 0 25.6-4 25.6-48.8 0 0 4.8-22.4-12-45.6 0 0 20.8-108-16.8-142.4 0 0-34.4-56.8-116.8-61.6-82.4 4.8-116.8 61.6-116.8 61.6-37.6 34.4-16.8 142.4-16.8 142.4C361.6 355.2 366.4 377.6 366.4 377.6c0 44.8 25.6 48.8 25.6 48.8C392 480.8 428.8 515.2 428.8 515.2l0 77.6c-16.8 23.2-141.6 60.8-141.6 60.8C130.4 668 128 843.2 128 843.2c0 55.2 27.2 52.8 27.2 52.8L512 896l356.8 0c0 0 27.2 2.4 27.2-52.8C896 843.2 893.6 668 736.8 653.6z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-icon" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M511.973906 688.912245c0-78.372975 46.977941-145.772015 114.303302-175.60139-27.01733-14.754029-56.365752-25.720801-87.461981-32.463366 62.560848-28.326139 106.059548-91.064019 106.059548-163.898861 0-99.388615-80.992639-179.982164-180.897-179.982164-99.927897 0-180.897 80.59355-180.897 179.982164 0 72.736605 43.36874 135.400806 105.795535 163.78118C240.132614 512.455371 130.471029 638.968763 128.151193 821.415049c-0.141216 11.483542 0.562818-2.062985 1.616824 9.093099l444.559005 0C536.008298 795.408745 511.973906 744.966912 511.973906 688.912245zM845.761038 685.585477c-0.162706-7.312546-0.889253-14.436804-2.109034-21.37482-0.398066-2.225691-0.820692-4.405333-1.288343-6.608511-1.641383-7.217379-3.820002-14.201443-6.515391-20.973684-0.37453-1.006933-0.515746-2.085498-0.937348-3.047406-0.445138-1.054005-1.14815-1.944282-1.616824-2.99931-2.789533-6.210445-6.02318-12.140505-9.655917-17.835204-1.289366-2.015913-2.601244-3.984754-3.984754-5.929036-3.960195-5.601578-8.319479-10.851139-13.028735-15.818267-0.797156-0.797156-1.359974-1.805112-2.156106-2.601244-0.820692-0.797156-1.805112-1.359974-2.623757-2.13257-4.922103-4.734838-10.217712-9.094122-15.796778-13.054317-1.944282-1.382487-3.937682-2.695389-5.951549-4.007267-5.672186-3.608178-11.600199-6.843872-17.810644-9.655917-1.054005-0.445138-1.944282-1.171686-3.000334-1.617847-1.006933-0.398066-2.061962-0.538259-3.069919-0.959861-6.749728-2.670829-13.732769-4.826935-20.974707-6.467295-2.179642-0.49221-4.359284-0.890276-6.561439-1.264806-6.983041-1.242294-14.107299-1.968841-21.419845-2.156106-1.125637 0-2.179642-0.327458-3.304256-0.327458-1.124614 0-2.202155 0.327458-3.327792 0.327458-7.28901 0.188288-14.413268 0.914836-21.396309 2.156106-2.202155 0.37453-4.381797 0.772596-6.561439 1.264806-7.241938 1.641383-14.224979 3.796466-20.998243 6.467295-1.007957 0.421602-2.038426 0.562818-3.047406 0.959861-1.055029 0.447185-1.968841 1.172709-2.99931 1.617847-6.210445 2.812045-12.140505 6.046716-17.811668 9.655917-2.01489 1.288343-4.007267 2.62478-5.976108 4.007267-5.577019 3.984754-10.850116 8.319479-15.771195 13.054317-0.820692 0.772596-1.805112 1.335415-2.62478 2.13257-0.796132 0.796132-1.358951 1.804089-2.155083 2.601244-4.711302 4.967128-9.069563 10.216689-13.029758 15.795754-1.38351 1.967818-2.695389 3.936659-4.007267 5.951549-3.609201 5.693676-6.842849 11.623735-9.632381 17.835204-0.491187 1.054005-1.171686 1.944282-1.616824 2.99931-0.421602 0.960885-0.562818 2.039449-0.959861 3.047406-2.671852 6.749728-4.851495 13.756305-6.492878 20.973684-0.467651 2.203178-0.889253 4.38282-1.288343 6.608511-1.217734 6.985088-1.944282 14.109346-2.13257 21.37482 0 1.124614-0.304945 2.202155-0.304945 3.326768 0 1.125637 0.304945 2.203178 0.304945 3.327792 0.188288 7.265474 0.914836 14.389732 2.13257 21.372773 0.399089 2.203178 0.796132 4.40738 1.288343 6.609535 1.641383 7.218402 3.820002 14.202467 6.492878 20.952194 0.398066 1.006933 0.538259 2.061962 0.959861 3.068895 0.446162 1.055029 1.149173 1.945305 1.616824 3.000334 2.790556 6.186909 6.02318 12.115945 9.632381 17.810644 1.311879 2.015913 2.623757 4.00829 4.007267 5.976108 3.960195 5.577019 8.319479 10.827603 13.029758 15.748682 0.796132 0.843204 1.358951 1.828648 2.155083 2.648316 0.820692 0.797156 1.805112 1.359974 2.62478 2.156106 4.944616 4.710278 10.194176 9.046027 15.771195 13.006222 1.968841 1.406023 3.961218 2.717901 5.976108 4.030803 5.671163 3.608178 11.601222 6.842849 17.811668 9.654894 1.054005 0.446162 1.943258 1.172709 2.99931 1.594311 0.984421 0.422625 2.038426 0.562818 3.047406 0.937348 6.77224 2.695389 13.755282 4.875031 20.973684 6.515391 2.179642 0.468674 4.38282 0.890276 6.585999 1.264806 6.983041 1.242294 14.107299 1.968841 21.372773 2.13257 1.149173 0.023536 2.203178 0.352017 3.351328 0.352017s2.203178-0.327458 3.351328-0.352017c7.265474-0.163729 14.389732-0.890276 21.372773-2.13257 2.202155-0.37453 4.381797-0.796132 6.561439-1.264806 7.241938-1.641383 14.224979-3.820002 20.998243-6.515391 0.985444-0.37453 2.039449-0.514723 3.047406-0.937348 1.055029-0.421602 1.945305-1.14815 3.000334-1.594311 6.210445-2.812045 12.138458-6.045693 17.810644-9.67843 2.01489-1.289366 4.007267-2.601244 5.951549-3.983731 5.578042-3.961218 10.851139-8.320503 15.796778-13.029758 0.819668-0.796132 1.804089-1.358951 2.623757-2.156106 0.796132-0.819668 1.358951-1.805112 2.156106-2.648316 4.710278-4.92108 9.06854-10.194176 13.028735-15.772218 1.38351-1.943258 2.695389-3.936659 4.007267-5.928013 3.609201-5.719258 6.843872-11.623735 9.632381-17.835204 0.468674-1.054005 1.172709-1.944282 1.616824-3.000334 0.421602-1.006933 0.562818-2.061962 0.937348-3.068895 2.695389-6.749728 4.875031-13.733792 6.515391-20.974707 0.467651-2.179642 0.890276-4.38282 1.288343-6.587022 1.218758-6.983041 1.945305-14.107299 2.109034-21.372773 0.024559-1.124614 0.328481-2.202155 0.328481-3.327792C846.089519 687.787632 845.785597 686.710091 845.761038 685.585477zM672.768055 753.996566l-80.271208-80.246649 26.598798-26.598798 53.198619 56.174394 113.402793-93.90574 24.747637 29.247114L672.768055 753.996566z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
