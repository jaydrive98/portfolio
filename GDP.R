
#---------------------------------------------------------------------------------------------------------
#                                       Admin Stuff
#---------------------------------------------------------------------------------------------------------

rm(list = ls())

# Packages
pacman::p_load(pacman, stargazer, readxl, rio, dplyr,quantmod ,ggplot2, patchwork, hrbrthemes, car)


# Data
setwd("/Users/Jason/Downloads/Takeout 2/Drive/my cv/")
data = rio::import("US GDP.xlsx")
attach(data)
View(data)
?rm

#---------------------------------------------------------------------------------------------------------
#                                   Variable Definitions
#---------------------------------------------------------------------------------------------------------

# Yield Spread
yield_spread = ten_year - three_month
data$yield_spread = data$ten_year - data$three_month

# Create lag variables
######################################################################### I only deliberately use equal signs as an act of rebellion because I prefer python
data["gdp_1"] = dplyr::lag(gdp, 1) 

# Growth Rate
data["gdp_g"] = (data["gdp"]- data["gdp_1"])/data["gdp_1"]


data["gdp_g1"] = dplyr::lag(data$gdp_g, 1)

data["gdp_g4"] = dplyr::lag(data$gdp_g, 4)

data["yield_spread_4"] = dplyr::lag(yield_spread, 4)

#--------------------------------------------------------------------------------------------
#                                     Function Definitions
#-------------------------------------------------------------------------------------------

next_q = function(model, val) {
  b0 = as.numeric(model$coefficient[1])
  b1 = as.numeric(model$coefficient[2])
  to_return = b0 + data$gdp_g[val]*b1
  return(100*to_return)
}

forecast_error = function(forc, real) {
  diff = real - forc
  return(diff)
}

#---------------------------------------------------------------------------------------------------------------
#                                             R Plots
#--------------------------------------------------------------------------------------------------------------

# Gross Domestic Product
plot(y = gdp, x = date, type = "l", main = "Gross Domestic Product (January 2004 - October 2019)", xlab = "Date", ylab = "Gross Domestic Product")

# GDP Growth Rate
plot(y = data$gdp_g, x = date, type = "l", main = "GDP Growth Rate (April 2004 - October 2019)", xlab = "Date", ylab = "GDP Growth Rate")

# Yield Spread
plot(y = yield_spread, x = date, type = "l", main = "Yield Spread (Jan 2004 - October 2019)", xlab = "Time", ylab = "Yield Spread")


#p1 = ggplot(data, aes(x=date, y=data$gdp)) + geom_line(col="red", size = 2) +ggtitle("Gross Domestic Product") + theme_ipsum()
#p2 = ggplot(data, aes(x=date, y=data$gdp_g)) + geom_line(col="green", size = 2) +ggtitle("GDP Growth Rate") + theme_ipsum()
#p1 + p2
#
#options(scipen = 999)
#
#ggplot(data, aes(x=date)) + geom_line(aes(y=data$gdp)) +ggtitle("Gross Domestic Product")+ geom_line(aes(y=data$gdp_g)) + scale_y_continuous(name = "Gross Domestic Product", sec.axis = sec_axis(trans = ~.*0.000000005, name = "GDP Growth Rate")) + theme_ipsum()
#ggplot(data, aes(x=date)) + geom_line(aes(y=data$gdp, col = "red")) + geom_line(aes(y=data$gdp_g/0.000000005)) + scale_y_continuous(name = "Gross Domestic Product", sec.axis = sec_axis(trans = ~.*0.000000005, name = "GDP Growth Rate")) + theme_ipsum()

plot(y=diff(gdp, lag=1),x = date[-1], type="l",main = "Gross Domestic Product With Growth Rate", xlab = "Date (January 2004 - October 2019)", ylab = "Gross Domestic Product" )



plot(y = gdp, x = date, type = "l", main = "Gross Domestic Product With Growth Rate", xlab = "Date (January 2004 - October 2019)", ylab = "Gross Domestic Product")
par(new = T)
plot(y = data$gdp_g, x = date, type = "l",xlab = "Date", col="red", yaxt="n", ann = F)

# Scatter Plot
plot(y = data$gdp_g, x = data$yield_spread_4, main = "Scatter of GDP & Yield Spread", xlab = "Yield Spread", ylab = "∆GPD")
abline(lm(data$gdp_g ~ data$yield_spread_4), col = "red")
lines(lowess(data$yield_spread_4, data$gdp_g), col = "blue")

# Enhanced Scatterplot
scatterplot(gdp_g ~data$yield_spread_4, data = data,  xlab = "Yield Spread (t-4)", ylab = "∆GDP", main = "Scatterplot of ∆GPD vs Yield Spread", col="red" )


plot(y = lag(data$gdp_g1, 4), x = date, type = "l",col =c("black", alpha = 0.5), main = "GDP Growth Rate vs Lagged Yield", xlab = "Date (January 2004 - October 2019)", ylab = "Percentage Yield")
abline(0, 0, lty = 2, col = "black")
axis(1, seq(2002, 2020,2), las = 2)
par(new = T)
plot(y = data$yield_spread,  x = date, type = "l",xlab = "Date", yaxt="n", ann = F, col = "red")
par(new = T)
plot(y = lag(data$three_month, 4), x = date, type = "o",xlab = "Date", col= c("blue", alpha = 0.5), yaxt="n", ann = F)
par(new = T)
plot(y = lag(data$ten_year, 4), x = date, type = "o",xlab = "Date", col=c("purple",alpha = 0.5), yaxt="n", ann = F)

legend("topright", lty = c(1,1,1,1), cex = 0.5 ,legend = c("GDP Growth Rate", "Yield Spread", "Three Month Yield", "Ten-Year Yield"), col = c("black", "red", "blue", "purple"))

on.exit(par(opar))

#---------------------------------------------------------------------------------------------------------
#                                     Tables
#---------------------------------------------------------------------------------------------------------

# Summary Stats for all data
summary(data)

# remOve date
summary(data[,-1])

summary(data[c(2,3,4,5,6)])

# Output 
stargazer(as.data.frame(data[-1]), type = "html", digits = 2, median = T, flip = F, nobs = T, mean.sd = T, 
          iqr = T, out = "summary.html", title = "Descriptive Statistics Table", 
          covariate.labels = c("Three Month","Five Year", "Ten Year","Gross Domestic Product", "GDP lag 1", "GDP Growth Rate"))
?stargazer
#----------------------------------------------------------------------------------------------------------
#                                    Forecast
#----------------------------------------------------------------------------------------------------------

m1 = lm(gdp_g ~ gdp_g4, data = data)

m2 = lm(gdp_g ~ yield_spread_4, data = data)

m3 = lm(gdp_g ~ gdp_g4 + yield_spread_4, data = data)

stargazer(m1, m2, m3, type = "html", title = "Output Autoregressive Regression Models" , 
          dep.var.labels = "GDP Growth Rate",covariate.labels = c("GDP t-4", "Yield Spread t-4"), 
          column.labels = c("Model 1", "Model 2", "Model 3"), out = "models.html")

#next_q(m1, data$GDP_g[224])
a = next_q(m1, data$GDP_g[224])
b = next_q(m2, data$GDP_g[224])
c = next_q(m3, data$GDP_g[224])

AIC(m1, m2, m3)
BIC(m1, m2, m3)


#plot(gdp, type = "l")
#par(new = T)
#plot(diff(gdp), type = "l")

next_q(m1, 64)
next_q(m2, 64)
next_q(m3, 64)

forecast_error(next_q(m1, 64)/100, data$gdp_g[64])
forecast_error(next_q(m2, 64)/100, data$gdp_g[64])
forecast_error(next_q(m3, 64)/100, data$gdp_g[64])
