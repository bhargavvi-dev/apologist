module CommonFunctions
  def convert_to_number(number, flt = true)
    number = number.to_s.gsub(" ", "").gsub(",", ".")
    if flt
      number.to_f.round(2)
    else
      number.to_i
    end
  end

  def show_formatted_number(number, decimal_points = 0, with_space = true)
    number = number.to_s.gsub(',', '.').to_f.round(decimal_points).to_s
    if with_space
      number = number.gsub(/(\d)(?=(\d\d\d)+(?!\d))/, "\\1#{','}").gsub(',', ' ')
    end
    number.gsub('.', ',')
  end
end